import { Metadata } from "next"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllDeveloperApplications } from "@/actions/developer"
import DeveloperApplicationsList from "./components/DeveloperApplicationsList"

export const metadata: Metadata = {
  title: "Developer Applications | Admin",
  description: "Review and manage real estate developer applications",
}

export default async function AdminDeveloperApplicationsPage() {
  const user = await currentUser()
  
  if (!user || user.role !== "ADMIN") {
    redirect("/login")
  }

  const { applications, error } = await getAllDeveloperApplications()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading applications: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Developer Applications</h1>
        <p className="text-gray-600 mt-2">Review and manage real estate developer applications</p>
      </div>

      <DeveloperApplicationsList applications={applications || []} />
    </div>
  )
}
