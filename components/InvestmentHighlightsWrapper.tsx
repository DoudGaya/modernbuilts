import { getAllProjects } from "@/actions/project"
import { InvestmentHighlights } from "./InvestmentHighlights"

export const InvestmentHighlightsWrapper = async () => {
  const result = await getAllProjects({ status: 'ACTIVE' })
  const projects = result.success ? result.projects?.slice(0, 3) || [] : []

  return <InvestmentHighlights projects={projects} />
}
