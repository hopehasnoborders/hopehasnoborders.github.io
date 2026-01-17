import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

// This endpoint handles donation form submissions
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
        const emailSubject = `[HHNB] ${formType} - from ${name}`
        const emailHtml = `
            <h2>New Submission: ${formType}</h2>
            <hr/>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Preferred Contact:</strong> ${preferredContact || 'Email'}</p>
            <p><strong>Available Date:</strong> ${availableDate || 'Flexible'}</p>
            <hr/>
            <h3>Details:</h3>
            <p>${items ? items.replace(/\n/g, '<br/>') : 'Not specified'}</p>
            <hr/>
            <h3>Additional Message:</h3>
            <p>${message ? message.replace(/\n/g, '<br/>') : 'No additional message'}</p>
            <hr/>
            <p style="color: #666; font-size: 12px;">
                This email was sent from the Hope Has No Borders website.
            </p>
        `.trim()

        // Send email using Resend SDK
        if (process.env.RESEND_API_KEY) {
            const { data, error } = await resend.emails.send({
                from: 'Hope Has No Borders <onboarding@resend.dev>',
                to: ['hhnbwebsite@gmail.com'],
                replyTo: email,
                subject: emailSubject,
                html: emailHtml,
            })

            if (error) {
                console.error('Resend error:', error)
                return NextResponse.json(
                    { error: 'Failed to send email. Please try again or email us directly.' },
                    { status: 500 }
                )
            }

            console.log('Email sent successfully:', data)

            return NextResponse.json({
                success: true,
                message: 'Your submission has been sent! We will contact you soon.'
            })
        }

        // Fallback - Log and return success (for local testing without API key)
        console.log('=== FORM SUBMISSION (No API Key) ===')
        console.log('Subject:', emailSubject)
        console.log('To: hhnbwebsite@gmail.com')
        console.log('From:', email)
        console.log('Content:', items)
        console.log('=====================================')

        return NextResponse.json({
            success: true,
            message: 'Your submission has been received! We will contact you soon.',
            note: 'Email service not configured - form data logged'
        })

    } catch (error) {
        console.error('Form submission error:', error)
        return NextResponse.json(
            { error: 'Failed to process your submission. Please try again or email us directly at hhnbwebsite@gmail.com' },
            { status: 500 }
        )
    }
}
