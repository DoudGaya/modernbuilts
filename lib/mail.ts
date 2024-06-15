import { Resend } from 'resend'


const resend = new Resend(process.env.RESEND_API_KEY)


export const sendVrificationEmail = async ( email: string, token: string) => {

    const confirmationLink = `http://localhost:3000/email-verification?token=${token}`


    await resend.emails.send({
        from: 'Stablebricks <noreply@stablebricks.com>',
        to: email,
        subject: "Verify your Stablebricks Account",
        html: `<p>Click the link to <a href="${confirmationLink}">Confirm your Email </a></p>`
    })

}