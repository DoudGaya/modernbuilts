
import * as z from "zod"

// Existing schemas
export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
})

// export const signUpSchema = z.object({
//   fullName: z.string().min(1, {
//     message: "Full name is required",
//   }),
//   email: z.string().email({
//     message: "Email is required",
//   }),
//   password: z.string().min(6, {
//     message: "Minimum 6 characters required",
//   }),
//   passwordConfirmation: z.string().min(6, {
//     message: "Minimum 6 characters required",
//   }),
//   phone: z.string().min(10, {
//     message: "Valid phone number is required",
//   }),
//   ref: z.optional(z.string()),
// })

// New schemas for project and other entities
export const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  length: z.string().min(1, { message: "Length is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  valuation: z.string().min(1, { message: "Valuation is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  sharePrice: z.number().min(1, { message: "Share price must be at least 1" }),
  roi: z.number().min(1, { message: "ROI must be at least 1" }),
  projectStatus: z.enum(["PENDING", "ACTIVE", "END", "COMPLETED"]),
  coverImage: z.string().min(1, { message: "Cover image is required" }),
  video: z.string().optional(),
  images: z.array(z.string()).min(1, { message: "At least one image is required" }),
})

export const propertyListingSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  location: z.string().min(1, { message: "Location is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area: z.string().optional(),
  type: z.string().min(1, { message: "Type is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  features: z.array(z.string()),
  coverImage: z.string().min(1, { message: "Cover image is required" }),
  images: z.array(z.string()).min(1, { message: "At least one image is required" }),
  status: z.string().default("Active"),
})

export const complaintSchema = z.object({
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
})

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export const landSubmissionSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  size: z.string().min(1, { message: "Size is required" }),
  titleType: z.string().min(1, { message: "Title type is required" }),
  currentUse: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  documents: z.array(z.string()).min(1, { message: "At least one document is required" }),
  plans: z.array(z.string()).optional(),
})

export const developerApplicationSchema = z.object({
  companyName: z.string().optional(),
  experience: z.string().min(1, { message: "Experience is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  portfolio: z.string().optional(),
  documents: z.array(z.string()).min(1, { message: "At least one document is required" }),
})



export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  image: z.optional(z.any())
}) 

export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 


// export const loginSchema = z.object({
//     email: z.string().email({
//       message: "Email must be of type email"
//     }),
//     password: z.string().min(1, {
//       message: "Password is required"
//     }),
//     code: z.optional(z.string().length(6))
//   })
  

  export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
  })

  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
  })
  

  export const signUpSchema = z.object({
    fullName: z.string().min(2, {
      message: "Please provide your Full Name",
    }),
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
    ref: z.optional(z.string())
  })

  