import { prisma } from "@/lib/prisma";

export async function Seed() {
    await prisma.issue.createMany({
        data: [
            {
                title: "Fix Login Validation",
                description: `# Login Validation

Users can submit empty passwords.

## Tasks
- Add frontend validation
- Add backend validation
- Show proper error messages`,
            },
            {
                title: "Improve Dashboard Performance",
                description: `# Dashboard Performance

The dashboard loads slowly.

## Investigation
- Check database queries
- Review API response times
- Optimize React rendering`,
            },
            {
                title: "Add Dark Mode",
                description: `# Dark Mode

Users requested a dark theme.

## Requirements
- Theme toggle
- Persist preference
- Update all pages`,
            },
            {
                title: "Fix Mobile Navigation",
                description: `# Mobile Navigation

Navigation menu is broken on small screens.

- Test on Android
- Test on iPhone
- Fix responsive layout`,
            },
            {
                title: "Update User Profile Page",
                description: `# Profile Page

## New Fields
- Bio
- Avatar
- Social Links

> Users should be able to update their profile easily.`,
            },
            {
                title: "Create Notifications System",
                description: `# Notifications

## Features
- In-app notifications
- Read/Unread status
- Real-time updates`,
            },
            {
                title: "Fix Pagination Bug",
                description: `# Pagination Bug

The last page returns duplicate records.

## Expected
1. Unique records
2. Correct page count`,
            },
            {
                title: "Add Search Functionality",
                description: `# Search Feature

Search issues by:

- Title
- Description
- Status`,
            },
            {
                title: "Refactor Auth Service",
                description: `# Authentication Refactor

## Goals
- Cleaner code
- Better error handling
- Unit tests`,
            },
            {
                title: "Implement Issue Assignment",
                description: `# Assign Issues

Allow assigning issues to users.

## Acceptance Criteria
- Select assignee
- Update assignment
- Display assignee`,
            },
            {
                title: "Add Activity Logs",
                description: `# Activity Logs

Track:

- Issue creation
- Issue updates
- Status changes`,
            },
            {
                title: "Improve Error Pages",
                description: `# Error Pages

## Pages
- 404
- 500
- Unauthorized

> Improve UX and branding.`,
            },
            {
                title: "Add File Upload Support",
                description: `# File Upload

Users should attach screenshots.

## Constraints
- Max 5MB
- PNG/JPG only`,
            },
            {
                title: "Optimize Database Queries",
                description: `# Database Optimization

## Queries To Review
- Issue list
- User lookup
- Dashboard stats`,
            },
            {
                title: "Implement Email Notifications",
                description: `# Email Notifications

Send emails when:

- Issue assigned
- Status changed
- Comment added`,
            },
            {
                title: "Add Comments System",
                description: `# Comments

## Features
- Add comment
- Edit comment
- Delete comment`,
            },
            {
                title: "Create Admin Dashboard",
                description: `# Admin Dashboard

## Metrics
- Total users
- Open issues
- Closed issues`,
            },
            {
                title: "Improve Accessibility",
                description: `# Accessibility

- Keyboard navigation
- ARIA labels
- Color contrast review`,
            },
            {
                title: "Add API Rate Limiting",
                description: `# Rate Limiting

Protect APIs from abuse.

## Rules
- 100 requests/minute
- IP based`,
            },
            {
                title: "Setup Automated Testing",
                description: `# Automated Testing

## Coverage
- Unit Tests
- Integration Tests
- E2E Tests

\`\`\`
npm test
\`\`\``,
            },
        ],
    });

}

