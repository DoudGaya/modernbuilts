import { Http2Server } from "http2"
import { NextResponse } from "next/server"


export async function POST(req: any) {

    try {
        const {name, email, password} = await req.json()


        return NextResponse.json(
            {
                message: "User Account created successfully",
                status: 201
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: "An Error occured while registering the user", 
                status: 500,
            }
        )
    }
    
}