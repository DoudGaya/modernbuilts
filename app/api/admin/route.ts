import { useCurrentRole } from "@/hooks/use-current-role";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";



export async function GET() {

    const role = await currentRole()
    if (role === UserRole.ADMIN) {
        redirect('/admin/dashboard')
        return new NextResponse(null, {status: 200})
    }
    redirect('/user/dashboard')
    return new NextResponse(null, {status: 403})
}




