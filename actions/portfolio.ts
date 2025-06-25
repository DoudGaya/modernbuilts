"use server"

import { db } from "@/lib/db"

export const getPortfolioProjects = async () => {
  try {
    const projects = await db.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
        city: true,
        state: true,
        location: true,
        investmentRequired: true,
        valuation: true,
        roi: true,
        projectStatus: true,
        category: true,
        duration: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate portfolio statistics
    const totalProjects = projects.length
    const completedProjects = projects.filter(p => p.projectStatus === 'COMPLETED').length
    const totalInvestment = projects.reduce((sum, p) => sum + p.investmentRequired, 0)
    const averageROI = projects.length > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.roi, 0) / projects.length)
      : 0

    return {
      success: true,
      projects,
      stats: {
        totalProjects,
        completedProjects,
        totalInvestment,
        averageROI
      }
    }
  } catch (error) {
    console.error("Error fetching portfolio projects:", error)
    return {
      success: false,
      error: "Failed to fetch portfolio projects"
    }
  }
}
