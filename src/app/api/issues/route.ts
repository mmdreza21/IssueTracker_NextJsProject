import { createIssueSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOption";
import { Seed } from "../seed";
import { Status } from "@prisma/client";

export async function POST(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session) NextResponse.json({}, { status: 401 });

    const body = await request.json()

    // Seed()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newIssue = await prisma.issue.create({ data: { title: body.title, description: body.description } })
    return NextResponse.json(newIssue);
}


export async function GET(request: NextRequest, { searchParams }: { searchParams: { status: Status, } }) {

    const statusParam = request.nextUrl.searchParams.get("status");

    const where =
        statusParam && Object.values(Status).includes(statusParam as Status)
            ? { status: statusParam as Status }
            : {};

    const issues = await prisma.issue.findMany({
        where,
    });
    if (!issues) return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })


    return NextResponse.json(issues);

}

