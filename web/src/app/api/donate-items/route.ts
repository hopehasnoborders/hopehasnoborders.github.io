import { NextRequest, NextResponse } from 'next/server'

// This endpoint handles donation form submissions
// For production, you would integrate with an email service like Resend, SendGrid, or use Netlify Forms

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            formType,
            name,
            email,
            phone,
            items,
            message,
            preferredContact,
            availableDate
        } = body

        // Validate required fields
        if (!name || !email || !formType) {
            return NextResponse.json(
                { error: 'Name, email, and form type are required' },
                { status: 400 }
            )
        }

        // Build the email content
        const emailSubject = `[HHNB Donation] ${formType} - from ${name}`
        const emailBody = `
New Donation Offer Received
============================

Form Type: ${formType}
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Contact Method: ${preferredContact || 'Email'}
Available Date: ${availableDate || 'Flexible'}

Items Being Donated:
${items || 'Not specified'}

Additional Message:
${message || 'No additional message'}

============================
This email was sent from the Hope Has No Borders website donation form.
        `.trim()

        // For Netlify, we'll use the Fetch API to send to an external email service
        // You'll need to set up one of these options:

        // Option 1: Resend (recommended - free tier available)
        if (process.env.RESEND_API_KEY) {
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Hope Has No Borders <donations@hopehasnoborders.org>',
                    to: ['hopehasnoborders@gmail.com'],
                    reply_to: email,
                    subject: emailSubject,
                    text: emailBody,
                }),
            })

            if (!resendResponse.ok) {
                const error = await resendResponse.text()
                console.error('Resend error:', error)
                throw new Error('Failed to send email via Resend')
            }

            return NextResponse.json({
                success: true,
                message: 'Your donation offer has been sent! We will contact you soon.'
            })
        }

        // Option 2: Fallback - Log and return success (for testing without email service)
        console.log('=== DONATION FORM SUBMISSION ===')
        console.log('Subject:', emailSubject)
        console.log('Body:', emailBody)
        console.log('================================')

        // In production without Resend, you could:
        // - Use Netlify Forms (add data-netlify="true" to form)
        // - Use SendGrid, Mailgun, etc.
        // - Use a webhook to Zapier/Make

        return NextResponse.json({
            success: true,
            message: 'Your donation offer has been received! We will contact you soon.',
            note: 'Email service not configured - form data logged to server'
        })

    } catch (error) {
        console.error('Donation form error:', error)
        return NextResponse.json(
            { error: 'Failed to process your donation offer. Please try again or email us directly.' },
            { status: 500 }
        )
    }
}
