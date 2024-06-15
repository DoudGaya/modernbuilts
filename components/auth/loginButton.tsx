"use client"
import { useRouter } from "next/navigation"


interface LoginButton {
    children: React.ReactNode
    mode?: "modal" | "redirrect"
    asChild?: boolean 
}


export const LoginButton = ({
    children,
    mode = 'redirrect',
    asChild,
}: LoginButton ) => {

    const router = useRouter()

    const buttonClicked = () => {
        return router.push('/login')
    }

    if (mode == 'modal') {
        return (
            <div className="">Modal Type of Button</div>
        )
    }
    return (
        <span onClick={buttonClicked} className="cursor-pointer">{children}</span>
    )
}