import { Metadata } from "next"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getDeveloperApplicationStatus } from "@/actions/developer"
import DeveloperDashboardContent from "./components/DeveloperDashboardContent"

export const metadata: Metadata = {
  title: "Developer Dashboard | StableBricks",
  description: "Manage your real estate development projects and raise capital",
}

export default async function DeveloperDashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect("/login")
  }

  if (user.role !== "DEVELOPER") {
    redirect("/developer")
  }

  const { application } = await getDeveloperApplicationStatus(user.id)

  if (!application || application.status !== "APPROVED") {
    redirect("/developer")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperDashboardContent user={user} application={application} />
    </div>
  )
}
