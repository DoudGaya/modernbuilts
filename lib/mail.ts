import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const env = process.env.NODE_ENV
let baseUrl

if (env === "production") {
  baseUrl = "https://stablebricks.com"
} else {
  baseUrl = "http://localhost:3000"
}

const logoUrl = "https://stablebricks.com/stablebricks.png" // Replace with actual logo URL

// Email template with logo
const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>STABLEBRICKS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #f7d046;
    }
    .logo {
      max-width: 200px;
      height: auto;
    }
    .content {
      padding: 30px 0;
    }
    .button {
      display: inline-block;
      background-color: #f7d046;
      color: #000 !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="StableBricks Logo" class="logo">
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} STABLEBRICKS. All rights reserved.</p>
      <p>Kundila Housing Estate, Tarauni, Kano</p>
    </div>
  </div>
</body>
</html>
`

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const content = `
        <h2>Your Authentication Code</h2>
        <p>Please use the following code to complete your login:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; text-align: center; margin: 30px 0; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">${token}</h1>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Your Authentication Code",
    html: emailTemplate(content),
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseUrl}/new-password?token=${token}`

  const content = `
        <h2>Reset Your Password</h2>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        <p>This link will expire in 1 hour.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Reset Your Password",
    html: emailTemplate(content),
  })
}

export const sendVrificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${baseUrl}/email-verification?token=${token}`

  const content = `
        <h2>Verify Your Email Address</h2>
        <p>Thank you for registering with STABLEBRICkS Limited. Please click the button below to verify your email address:</p>
        <a href="${confirmationLink}" class="button">Verify Email</a>
        <p>If you didn't create an account with STABLEBRICKS, please ignore this email.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Verify Your STABLEBRICKS Account",
    html: emailTemplate(content),
  })
}

export const sendDeveloperApprovalEmail = async (email: string, name: string) => {
  const loginLink = `${baseUrl}/login`

  const content = `
        <h2>Congratulations, ${name}!</h2>
        <p>Your application to become a STABLEBRICKS developer has been approved.</p>
        <p>You can now access the developer dashboard and start submitting land and project proposals.</p>
        <a href="${loginLink}" class="button">Login to Your Account</a>
        <p>If you have any questions, please contact our support team.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Your Developer Application is Approved",
    html: emailTemplate(content),
  })
}

export const sendDeveloperRejectionEmail = async (email: string, name: string, reason: string) => {
  const content = `
        <h2>Application Status Update</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in becoming a STABLEBRICKS developer.</p>
        <p>After careful review of your application, we regret to inform you that we are unable to approve your request at this time.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>You are welcome to apply again in the future with additional information or experience.</p>
        <p>If you have any questions, please contact our support team.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Your Developer Application Status",
    html: emailTemplate(content),
  })
}

export const sendInvestmentConfirmationEmail = async (
  email: string,
  name: string,
  projectTitle: string,
  amount: string,
  certificateId: string,
) => {
  const dashboardLink = `${baseUrl}/user/dashboard`

  const content = `
        <h2>Investment Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your investment in <strong>${projectTitle}</strong>.</p>
        <p>Your investment of <strong>${amount}</strong> has been successfully processed.</p>
        <p>Your investment certificate ID is: <strong>${certificateId}</strong></p>
        <p>You can view your investment details and download your certificate from your dashboard.</p>
        <a href="${dashboardLink}" class="button">View Dashboard</a>
        <p>If you have any questions about your investment, please contact our support team.</p>
    `

  await resend.emails.send({
    from: "STABLEBRICKS <noreply@stablebricks.com>",
    to: email,
    subject: "Investment Confirmation",
    html: emailTemplate(content),
  })
}

export const sendBulkEmail = async (
  recipients: { email: string; name: string }[],
  subject: string,
  message: string,
  projectTitle?: string,
) => {
  // Create a batch for processing
  const batchSize = 10; // Process in smaller batches to avoid rate limits
  const batches = [];
  
  for (let i = 0; i < recipients.length; i += batchSize) {
    batches.push(recipients.slice(i, i + batchSize));
  }

  // Process each batch with a small delay between them
  for (const batch of batches) {
    const sendPromises = batch.map(recipient => {
      const content = `
        <h2>${subject}</h2>
        <p>Dear ${recipient.name},</p>
        ${projectTitle ? `<p>Re: <strong>${projectTitle}</strong></p>` : ""}
        <div>${message}</div>
      `;

      return resend.emails.send({
        from: "STABLEBRICKS <noreply@stablebricks.com>",
        to: recipient.email,
        subject: subject,
        html: emailTemplate(content),
        tags: [{ name: "email_type", value: "bulk_notification" }]
      });
    });

    await Promise.all(sendPromises);
    
    // Slight delay between batches to avoid rate limits
    if (batches.length > 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export const sendPropertyListingNotification = async (
  recipients: { email: string; name: string }[],
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    category: string;
    images: string[];
    coverImage: string;
  }
) => {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(property.price);
  
  const propertyUrl = `${baseUrl}/properties/${property.id}`;
  
  for (const recipient of recipients) {
    const content = `
      <h2>New Property Listing</h2>
      <p>Dear ${recipient.name},</p>
      <p>We're excited to share a new property that just became available:</p>
      
      <div style="margin: 20px 0; border: 1px solid #eee; padding: 15px; border-radius: 5px;">
        <img src="${property.coverImage}" alt="${property.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 3px;">
        
        <h3 style="margin-top: 15px;">${property.title}</h3>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Type:</strong> ${property.type}</p>
        <p><strong>Category:</strong> ${property.category}</p>
        <p><strong>Location:</strong> ${property.location}</p>
        
        <p>${property.description.substring(0, 150)}${property.description.length > 150 ? '...' : ''}</p>
        
        <a href="${propertyUrl}" class="button">View Property Details</a>
      </div>
      
      <p>If you have any questions or would like to schedule a viewing, please don't hesitate to contact us.</p>
    `;

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: recipient.email,
      subject: `New Property Listing: ${property.title}`,
      html: emailTemplate(content),
    });
  }
};