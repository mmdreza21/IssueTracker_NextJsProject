import { authOptions } from "@/app/auth/authOption";
import { prisma } from "@/lib/prisma";
import { patchIssueSchema } from "@/lib/validationSchemas";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params

    const session = getServerSession(authOptions)
    if (!session) NextResponse.json({}, { status: 401 });

    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const { assignedToUserId, title, description } = body

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } })
        if (!user) return NextResponse.json({ error: 'invalid user.' }, { status: 400 });
    }

    let issue = await prisma.issue.findUnique({
        where: { id: +id }
    })
    if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })


    issue = await prisma.issue.update({
        where: { id: issue.id },
        data: { title, description, assignedToUserId }
    })

    return NextResponse.json(issue);

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = getServerSession(authOptions)
    if (!session) NextResponse.json({}, { status: 401 });
    const { id } = await params

    let issue = await prisma.issue.findUnique({
        where: { id: +id }
    })
    if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })
    issue = await prisma.issue.delete({
        where: { id: issue.id },
    })

    return NextResponse.json(issue);

}