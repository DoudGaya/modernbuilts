"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { sendDeveloperApplicationConfirmation, sendNewDeveloperApplicationNotification, sendDeveloperApprovalEmail, sendDeveloperRejectionEmail } from "@/lib/mail"

// Developer application schema
const DeveloperApplicationSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyType: z.string().min(1, "Company type is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  establishedYear: z.string().min(4, "Established year is required"),
  companyAddress: z.string().min(10, "Company address must be at least 10 characters"),
  website: z.string().url("Valid website URL is required").optional().or(z.literal("")),
  
  // Contact Information
  contactPersonName: z.string().min(2, "Contact person name is required"),
  contactPersonTitle: z.string().min(2, "Contact person title is required"),
  contactPhone: z.string().min(10, "Valid phone number is required"),
  contactEmail: z.string().email("Valid email address is required"),
  
  // Experience and Expertise
  experienceYears: z.string().min(1, "Experience years is required"),
  projectTypes: z.array(z.string()).min(1, "At least one project type must be selected"),
  totalProjectsCompleted: z.string().min(1, "Total projects completed is required"),
  totalProjectValue: z.string().min(1, "Total project value is required"),
  
  // Completed Projects
  completedProjects: z.array(z.object({
    name: z.string().min(2, "Project name is required"),
    location: z.string().min(2, "Project location is required"),
    value: z.string().min(1, "Project value is required"),
    year: z.string().min(4, "Project year is required")
  })).min(1, "At least one completed project is required"),
  
  // Financial Information
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  hasLegalIssues: z.boolean(),
  legalIssuesDetails: z.string().optional(),
  
  // Additional Information
  businessDescription: z.string().min(50, "Business description must be at least 50 characters"),
  whyJoinPlatform: z.string().min(50, "Please explain why you want to join (minimum 50 characters)"),
  marketingStrategy: z.string().min(50, "Marketing strategy must be at least 50 characters"),
  
  // Terms and Conditions
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  agreeToDataProcessing: z.boolean().refine(val => val === true, "You must agree to data processing"),
})

export async function submitDeveloperApplication(data: z.infer<typeof DeveloperApplicationSchema>) {
  try {
    // Validate the data
    const validatedData = DeveloperApplicationSchema.parse(data)
    
    // Get current user
    const user = await currentUser()
    if (!user || !user.id) {
      return { error: "You must be logged in to submit an application" }
    }

    // Check if user already has a pending or approved application
    const existingApplication = await db.developerApplication.findFirst({
      where: {
        userId: user.id,
        status: {
          in: ["PENDING", "APPROVED"]
        }
      }
    })

    if (existingApplication) {
      if (existingApplication.status === "APPROVED") {
        return { error: "You already have an approved developer application" }
      }
      if (existingApplication.status === "PENDING") {
        return { error: "You already have a pending application under review" }
      }
    }

    // Create the application
    const application = await db.developerApplication.create({
      data: {
        userId: user.id,
        companyName: validatedData.companyName,
        companyType: validatedData.companyType,
        registrationNumber: validatedData.registrationNumber,
        taxNumber: validatedData.taxNumber,
        establishedYear: validatedData.establishedYear,
        companyAddress: validatedData.companyAddress,
        website: validatedData.website || null,
        contactPersonName: validatedData.contactPersonName,
        contactPersonTitle: validatedData.contactPersonTitle,
        contactPhone: validatedData.contactPhone,
        contactEmail: validatedData.contactEmail,
        experienceYears: validatedData.experienceYears,
        projectTypes: validatedData.projectTypes,
        totalProjectsCompleted: validatedData.totalProjectsCompleted,
        totalProjectValue: validatedData.totalProjectValue,
        completedProjects: validatedData.completedProjects,
        annualRevenue: validatedData.annualRevenue,
        hasInsurance: validatedData.hasInsurance,
        insuranceProvider: validatedData.insuranceProvider,
        hasLegalIssues: validatedData.hasLegalIssues,
        legalIssuesDetails: validatedData.legalIssuesDetails,
        businessDescription: validatedData.businessDescription,
        whyJoinPlatform: validatedData.whyJoinPlatform,
        marketingStrategy: validatedData.marketingStrategy,
        status: "PENDING",
      }
    })

    // Send confirmation email to developer
    try {
      await sendDeveloperApplicationConfirmation(
        validatedData.contactEmail,
        validatedData.contactPersonName,
        validatedData.companyName
      )
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the application if email fails
    }

    // Send notification to admin team
    try {
      const adminEmails = ["admin@stablebricks.com"] // Add actual admin emails
      await sendNewDeveloperApplicationNotification(adminEmails, {
        companyName: validatedData.companyName,
        contactPersonName: validatedData.contactPersonName,
        contactEmail: validatedData.contactEmail,
        experienceYears: validatedData.experienceYears,
        totalProjectValue: validatedData.totalProjectValue,
        applicationId: application.id
      })
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError)
      // Don't fail the application if email fails
    }

    return { 
      success: "Your developer application has been submitted successfully! You will receive an email confirmation shortly, and our team will review your application within 2-5 business days." 
    }

  } catch (error) {
    console.error("Developer application submission error:", error)
    
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      return { error: firstError.message }
    }

    return { error: "Something went wrong. Please try again." }
  }
}

export async function getDeveloperApplicationStatus(userId: string) {
  try {
    const application = await db.developerApplication.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return { application }
  } catch (error) {
    console.error("Error fetching developer application:", error)
    return { error: "Failed to fetch application status" }
  }
}

export async function getAllDeveloperApplications() {
  try {
    const user = await currentUser()
    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized access" }
    }

    const applications = await db.developerApplication.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return { applications }
  } catch (error) {
    console.error("Error fetching developer applications:", error)
    return { error: "Failed to fetch applications" }
  }
}

export async function updateDeveloperApplicationStatus(
  applicationId: string, 
  status: "APPROVED" | "REJECTED", 
  feedback?: string
) {
  try {
    const user = await currentUser()
    if (!user || user.role !== "ADMIN") {
      return { error: "Unauthorized access" }
    }

    // Update application status
    const application = await db.developerApplication.update({
      where: { id: applicationId },
      data: { 
        status,
        feedback: feedback || null,
        updatedAt: new Date()
      },
      include: {
        user: true
      }
    })

    // If approved, update user role to DEVELOPER
    if (status === "APPROVED") {
      await db.user.update({
        where: { id: application.userId },
        data: { role: "DEVELOPER" }
      })
    }

    // Send notification email to the developer
    try {
      if (status === "APPROVED") {
        await sendDeveloperApprovalEmail(application.user.email!, application.user.name!)
      } else {
        await sendDeveloperRejectionEmail(
          application.user.email!, 
          application.user.name!, 
          feedback || "Application did not meet our current requirements."
        )
      }
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Don't fail the update if email fails
    }

    return { 
      success: `Application ${status.toLowerCase()} successfully`,
      application 
    }

  } catch (error) {
    console.error("Error updating application status:", error)
    return { error: "Failed to update application status" }
  }
}
