"use server"
import { db } from "@/lib/db"

export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await db.project.findFirst({
      where: { 
        slug: slug,
        projectStatus: "ACTIVE"
      },
      include: {
        investment: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            investment: true,
          },
        },
      },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    // Calculate funding progress
    const totalInvested = project.investment.reduce((sum, inv) => sum + inv.investmentAmount, 0)
    const fundingProgress = (totalInvested / parseInt(project.valuation.replace(/[^\d]/g, ''))) * 100

    return { 
      success: true, 
      project: {
        ...project,
        totalInvested,
        fundingProgress: Math.min(fundingProgress, 100),
        totalInvestors: project._count.investment,
      }
    }
  } catch (error) {
    console.error("Project fetch error:", error)
    return { error: "Failed to fetch project" }
  }
}
