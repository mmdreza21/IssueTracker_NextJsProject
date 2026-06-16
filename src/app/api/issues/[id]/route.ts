import { prisma } from "@/lib/prisma";
import { createIssueSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    let issue = await prisma.issue.findUnique({
        where: { id: +id }
    })
    if (!issue) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })

    issue = await prisma.issue.update({
        where: { id: issue.id },
        data: { title: body.title, description: body.description }
    })

    return NextResponse.json(issue);

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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