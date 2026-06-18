import { z } from 'zod'
export const createIssueSchema = z.object({
    title: z.string().min(1, 'title is too short!'),
    description: z.string().min(10, 'description is too short!').max(65535),
})


export const patchIssueSchema = z.object({
    title: z.string().min(1, 'title is too short!').optional(),
    description: z.string().min(10, 'description is too short!').max(65535).optional(),
    assignedToUserId: z.string().min(1, "assignToUserId is required.").max(255).optional().nullable()
})