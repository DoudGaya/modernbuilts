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
}

// Complaint notification email to admins
export const sendComplaintNotificationEmail = async ({
  complaintId,
  subject,
  description,
  userName,
  userEmail
}: {
  complaintId: string
  subject: string
  description: string
  userName: string
  userEmail: string
}) => {
  try {
    const complaintUrl = `${baseUrl}/admin/complaints/${complaintId}`
    
    const content = `
      <div class="content">
        <h2>New Complaint Submitted</h2>
        
        <p>A new complaint has been submitted that requires your attention.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Complaint Details:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>User:</strong> ${userName} (${userEmail})</p>
          <p><strong>Complaint ID:</strong> ${complaintId}</p>
          <p><strong>Description:</strong></p>
          <p style="white-space: pre-wrap;">${description}</p>
        </div>
        
        <a href="${complaintUrl}" class="button">View & Respond to Complaint</a>
      </div>
      
      <p>Please respond to this complaint as soon as possible to maintain good customer relations.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: "admin@stablebricks.com", // Replace with actual admin email
      subject: `New Complaint: ${subject}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending complaint notification email:", error)
  }
}

// Complaint response email to user
export const sendComplaintResponseEmail = async ({
  userEmail,
  userName,
  subject,
  response,
  status,
  complaintId
}: {
  userEmail: string
  userName: string
  subject: string
  response: string
  status: string
  complaintId: string
}) => {
  try {
    const complaintUrl = `${baseUrl}/user/complaints/${complaintId}`
    
    const content = `
      <div class="content">
        <h2>Your Complaint Has Been Addressed</h2>
        
        <p>Dear ${userName},</p>
        
        <p>We have reviewed your complaint and are providing the following response:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Original Complaint:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Status:</strong> <span style="color: ${status === 'Resolved' ? '#22c55e' : '#3b82f6'};">${status}</span></p>
        </div>
        
        <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #22c55e;">Our Response:</h3>
          <p style="white-space: pre-wrap;">${response}</p>
        </div>
        
        <a href="${complaintUrl}" class="button">View Full Details</a>
      </div>
      
      <p>If you have any further questions or concerns, please don't hesitate to contact us.</p>
      <p>Thank you for your patience and for giving us the opportunity to resolve this matter.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: userEmail,
      subject: `Response to Your Complaint: ${subject}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending complaint response email:", error)
  }
}

// Contact notification email to admins
export const sendContactNotificationEmail = async ({
  contactId,
  name,
  email,
  phone,
  subject,
  message
}: {
  contactId: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) => {
  try {
    const contactUrl = `${baseUrl}/admin/contacts/${contactId}`
    
    const content = `
      <div class="content">
        <h2>New Contact Message</h2>
        
        <p>A new contact message has been received through the website.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Contact ID:</strong> ${contactId}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <a href="${contactUrl}" class="button">View & Respond</a>
      </div>
      
      <p>Please respond to this inquiry promptly to provide excellent customer service.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: "admin@stablebricks.com", // Replace with actual admin email
      subject: `New Contact: ${subject}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending contact notification email:", error)
  }
}

// Contact response email to user
export const sendContactResponseEmail = async ({
  userEmail,
  userName,
  subject,
  response,
  originalMessage
}: {
  userEmail: string
  userName: string
  subject: string
  response: string
  originalMessage: string
}) => {
  try {
    const content = `
      <div class="content">
        <h2>Thank You for Contacting Us</h2>
        
        <p>Dear ${userName},</p>
        
        <p>Thank you for reaching out to us. We have received your message and are providing the following response:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Original Message:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-wrap;">${originalMessage}</p>
        </div>
        
        <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #22c55e;">Our Response:</h3>
          <p style="white-space: pre-wrap;">${response}</p>
        </div>
      </div>
      
      <p>If you have any further questions, please don't hesitate to contact us again.</p>
      <p>We appreciate your interest in STABLEBRICKS and look forward to serving you.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: userEmail,
      subject: `Re: ${subject}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending contact response email:", error)
  }
}

// Land submission status notification email
export const sendLandSubmissionStatusEmail = async ({
  userEmail,
  userName,
  location,
  status,
  submissionId,
  feedback
}: {
  userEmail: string
  userName: string
  location: string
  status: string
  submissionId: string
  feedback?: string
}) => {
  try {
    const statusColor = status === 'Approved' ? '#22c55e' : status === 'Rejected' ? '#ef4444' : '#3b82f6'
    const statusMessage = status === 'Approved' 
      ? 'We are pleased to inform you that your land submission has been approved!'
      : status === 'Rejected'
      ? 'After careful review, we regret to inform you that your land submission has been rejected.'
      : 'Your land submission status has been updated.'

    const dashboardLink = `${baseUrl}/land-submissions`
    
    const content = `
      <div class="content">
        <h2>Land Submission Status Update</h2>
        
        <p>Dear ${userName},</p>
        
        <p>${statusMessage}</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Submission Details:</h3>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status}</span></p>
        </div>
        
        ${feedback ? `
        <div style="background-color: ${status === 'Approved' ? '#ecfdf5' : '#fef2f2'}; border: 1px solid ${status === 'Approved' ? '#d1fae5' : '#fecaca'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: ${statusColor};">Feedback from our team:</h3>
          <p style="white-space: pre-wrap;">${feedback}</p>
        </div>
        ` : ''}
        
        ${status === 'Approved' ? `
        <p>Our team will be in touch with you soon to discuss the next steps for your land development project.</p>
        ` : status === 'Rejected' ? `
        <p>You are welcome to submit a new application in the future with additional information or after addressing the concerns mentioned in the feedback.</p>
        ` : ''}
        
        <a href="${dashboardLink}" class="button">View Submission Details</a>
      </div>
      
      <p>If you have any questions about this decision, please don't hesitate to contact our support team.</p>
      <p>Thank you for your interest in partnering with STABLEBRICKS.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: userEmail,
      subject: `Land Submission ${status}: ${location}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending land submission status email:", error)
  }
}

// Land submission feedback notification email
export const sendLandSubmissionFeedbackEmail = async ({
  userEmail,
  userName,
  location,
  submissionId,
  feedback
}: {
  userEmail: string
  userName: string
  location: string
  submissionId: string
  feedback: string
}) => {
  try {
    const dashboardLink = `${baseUrl}/land-submissions`
    
    const content = `
      <div class="content">
        <h2>New Feedback on Your Land Submission</h2>
        
        <p>Dear ${userName},</p>
        
        <p>We have provided feedback on your land submission. Please review the details below:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Submission Details:</h3>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
        </div>
        
        <div style="background-color: #eff6ff; border: 1px solid #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3b82f6;">Feedback from our team:</h3>
          <p style="white-space: pre-wrap;">${feedback}</p>
        </div>
        
        <a href="${dashboardLink}" class="button">View Full Details</a>
      </div>
      
      <p>If you have any questions about this feedback, please feel free to contact our support team.</p>
      <p>Thank you for your continued interest in partnering with STABLEBRICKS.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: userEmail,
      subject: `New Feedback on Your Land Submission: ${location}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending land submission feedback email:", error)
  }
}

// Land submission notification email to admins
export const sendLandSubmissionNotificationEmail = async ({
  submissionId,
  name,
  email,
  phone,
  location,
  size,
  titleType,
  description
}: {
  submissionId: string
  name: string
  email: string
  phone: string
  location: string
  size: string
  titleType: string
  description: string
}) => {
  try {
    const submissionUrl = `${baseUrl}/admin/land-submissions`
    
    const content = `
      <div class="content">
        <h2>New Land Submission Received</h2>
        
        <p>A new land submission has been received that requires your review.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Submission Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Size:</strong> ${size}</p>
          <p><strong>Title Type:</strong> ${titleType}</p>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Description:</strong></p>
          <p style="white-space: pre-wrap;">${description.substring(0, 500)}${description.length > 500 ? '...' : ''}</p>
        </div>
        
        <a href="${submissionUrl}" class="button">Review & Respond to Submission</a>
      </div>
      
      <p>Please review this submission promptly and provide appropriate feedback to the landowner.</p>
    `

    await resend.emails.send({
      from: "STABLEBRICKS <noreply@stablebricks.com>",
      to: "admin@stablebricks.com",
      subject: `New Land Submission: ${location}`,
      html: emailTemplate(content),
    })
  } catch (error) {
    console.error("Error sending land submission notification email:", error)
  }
}