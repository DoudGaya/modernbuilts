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

export const sendDeveloperApplicationConfirmation = async (
  email: string,
  name: string,
  companyName: string
) => {
  const content = `
    <h2>Developer Application Received</h2>
    <p>Dear ${name},</p>
    <p>Thank you for submitting your developer application for <strong>${companyName}</strong>.</p>
    
    <div style="margin: 20px 0; border: 1px solid #eee; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
      <h3>What happens next?</h3>
      <ol>
        <li><strong>Application Review</strong> - Our team will review your application within 2-5 business days</li>
        <li><strong>Verification Process</strong> - We may contact you for additional information or documentation</li>
        <li><strong>Decision Notification</strong> - You'll receive an email with our decision</li>
        <li><strong>Account Setup</strong> - If approved, you'll get access to your developer dashboard</li>
      </ol>
    </div>
    
    <p>During the review process, our team will evaluate:</p>
    <ul>
      <li>Company credentials and registration</li>
      <li>Development experience and portfolio</li>
      <li>Financial stability and insurance coverage</li>
      <li>Compliance with regulatory requirements</li>
    </ul>
    
    <p>If you have any questions about your application or the review process, please don't hesitate to contact our developer relations team.</p>
    
    <p>Thank you for choosing StableBricks as your capital raising platform.</p>
  `;

  await resend.emails.send({
    from: "StableBricks Developer Relations <developers@stablebricks.com>",
    to: email,
    subject: "Developer Application Received - StableBricks",
    html: emailTemplate(content),
  });
};

export const sendDeveloperApplicationApproval = async (
  email: string,
  name: string,
  companyName: string,
  feedback?: string
) => {
  const dashboardUrl = `${baseUrl}/developer/dashboard`;
  
  const content = `
    <h2>Congratulations! Your Developer Application is Approved</h2>
    <p>Dear ${name},</p>
    <p>We're excited to inform you that your developer application for <strong>${companyName}</strong> has been approved!</p>
    
    <div style="margin: 20px 0; border: 1px solid #22c55e; padding: 15px; border-radius: 5px; background-color: #f0fdf4;">
      <h3 style="color: #22c55e;">Welcome to the StableBricks Developer Network!</h3>
      <p>You now have access to our exclusive developer platform where you can:</p>
      <ul>
        <li>Submit real estate projects for funding</li>
        <li>Access our network of qualified investors</li>
        <li>Track project performance and investor interest</li>
        <li>Manage your developer profile and portfolio</li>
      </ul>
    </div>
    
    ${feedback ? `
    <div style="margin: 20px 0; border: 1px solid #3b82f6; padding: 15px; border-radius: 5px; background-color: #eff6ff;">
      <h4 style="color: #3b82f6;">Feedback from our team:</h4>
      <p>${feedback}</p>
    </div>
    ` : ''}
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" class="button">Access Your Developer Dashboard</a>
    </div>
    
    <p>To get started:</p>
    <ol>
      <li>Log into your account and access your developer dashboard</li>
      <li>Complete your company profile (if not already done)</li>
      <li>Submit your first project for funding</li>
      <li>Start connecting with our investor community</li>
    </ol>
    
    <p>Our developer success team is here to help you maximize your success on the platform. If you have any questions, please don't hesitate to reach out.</p>
    
    <p>Welcome aboard!</p>
  `;

  await resend.emails.send({
    from: "StableBricks Developer Relations <developers@stablebricks.com>",
    to: email,
    subject: "Developer Application Approved - Welcome to StableBricks!",
    html: emailTemplate(content),
  });
};

export const sendDeveloperApplicationRejection = async (
  email: string,
  name: string,
  companyName: string,
  feedback?: string
) => {
  const applyUrl = `${baseUrl}/developer/apply`;
  
  const content = `
    <h2>Developer Application Update</h2>
    <p>Dear ${name},</p>
    <p>Thank you for your interest in joining the StableBricks developer network with <strong>${companyName}</strong>.</p>
    
    <div style="margin: 20px 0; border: 1px solid #ef4444; padding: 15px; border-radius: 5px; background-color: #fef2f2;">
      <p>After careful review, we're unable to approve your developer application at this time.</p>
    </div>
    
    ${feedback ? `
    <div style="margin: 20px 0; border: 1px solid #3b82f6; padding: 15px; border-radius: 5px; background-color: #eff6ff;">
      <h4 style="color: #3b82f6;">Feedback from our review team:</h4>
      <p>${feedback}</p>
    </div>
    ` : ''}
    
    <p>This decision doesn't reflect on your company's capabilities or potential. Our platform has specific criteria and capacity constraints that influence our approval process.</p>
    
    <h3>Next Steps</h3>
    <p>We encourage you to:</p>
    <ul>
      <li>Review the feedback provided (if any)</li>
      <li>Consider reapplying in 6-12 months</li>
      <li>Continue building your development portfolio</li>
      <li>Explore other funding opportunities for your projects</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${applyUrl}" class="button">Learn About Reapplying</a>
    </div>
    
    <p>We appreciate your interest in StableBricks and wish you success with your real estate development endeavors.</p>
  `;

  await resend.emails.send({
    from: "StableBricks Developer Relations <developers@stablebricks.com>",
    to: email,
    subject: "Developer Application Update - StableBricks",
    html: emailTemplate(content),
  });
};

export const sendNewDeveloperApplicationNotification = async (
  adminEmails: string[],
  applicationDetails: {
    companyName: string;
    contactPersonName: string;
    contactEmail: string;
    experienceYears: string;
    totalProjectValue: string;
    applicationId: string;
  }
) => {
  const reviewUrl = `${baseUrl}/admin/developer-applications`;
  
  const content = `
    <h2>New Developer Application Received</h2>
    <p>A new developer application has been submitted and is ready for review.</p>
    
    <div style="margin: 20px 0; border: 1px solid #3b82f6; padding: 15px; border-radius: 5px; background-color: #eff6ff;">
      <h3>Application Summary</h3>
      <p><strong>Company:</strong> ${applicationDetails.companyName}</p>
      <p><strong>Contact Person:</strong> ${applicationDetails.contactPersonName}</p>
      <p><strong>Email:</strong> ${applicationDetails.contactEmail}</p>
      <p><strong>Experience:</strong> ${applicationDetails.experienceYears}</p>
      <p><strong>Total Project Value:</strong> ${applicationDetails.totalProjectValue}</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${reviewUrl}" class="button">Review Application</a>
    </div>
    
    <p>Please review this application within 2-5 business days to maintain our response time commitments.</p>
  `;

  for (const email of adminEmails) {
    await resend.emails.send({
      from: "StableBricks Platform <noreply@stablebricks.com>",
      to: email,
      subject: `New Developer Application: ${applicationDetails.companyName}`,
      html: emailTemplate(content),
    });
  }
};