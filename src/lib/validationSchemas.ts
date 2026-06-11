import { z } from 'zod'
export const createIssueSchema = z.object({
    title: z.string().min(1, 'title is too short!'),
    description: z.string().min(5, 'description is too short!'),
})