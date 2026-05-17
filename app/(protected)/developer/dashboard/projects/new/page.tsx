import { Metadata } from "next"
import { currentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getDeveloperApplicationStatus } from "@/actions/developer"
import ProjectSubmissionForm from "./components/ProjectSubmissionForm"

export const metadata: Metadata = {
  title: "Submit New Project | Developer Dashboard",
  description: "Submit a new real estate project for funding",
}

export default async function NewProjectPage() {
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit New Project</h1>
          <p className="text-gray-600 mt-2">Create a new funding campaign for your real estate project</p>
        </div>

        <ProjectSubmissionForm developerId={user.id} />
      </div>
    </div>
  )
}
