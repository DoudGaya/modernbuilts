"use client"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useRouter } from "next/navigation"

interface InvestmentButtonProps {
  projectSlug: string
}

export function InvestmentButton({ projectSlug }: InvestmentButtonProps) {
  const user = useCurrentUser()
  const router = useRouter()

  const handleInvestClick = () => {
    if (user) {
      router.push(`/investments/${projectSlug}`)
    } else {
      router.push(`/login?redirectTo=${encodeURIComponent(`/investments/${projectSlug}`)}`)
    }
  }

  return (
    <Button 
      onClick={handleInvestClick}
      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
    >
      Start Investing
    </Button>
  )
}
