import { createIssueSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
export async function POST(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session) NextResponse.json({}, { status: 401 });
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newIssue = await prisma.issue.create({ data: { title: body.title, description: body.description } })

    return NextResponse.json(newIssue);

}


