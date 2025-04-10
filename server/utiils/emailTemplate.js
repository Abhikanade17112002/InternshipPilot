const sendUpdateStatusEmail = (
  Status,
  ApplicantName,
  Jobtitle,
  Companyname,
  Companyemail
) => {
  const getStatusColor = (status) => {
    if (
      status.toLowerCase().includes("accepted") ||
      status.toLowerCase().includes("selected")
    )
      return "#22c55e"; // Green
    if (status.toLowerCase().includes("rejected")) return "#ef4444"; // Red
    return "#f59e0b"; // Amber for 'in-review' or others
  };

  return `
  <html>
    <body style="font-family: 'Segoe UI', sans-serif; color: #111827; background-color: #f3f4f6; padding: 40px;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 32px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color:rgb(0, 0, 0); margin-bottom: 20px;">Application Status Update</h2>
        <p style="margin: 0 0 10px;">Dear <strong>${ApplicantName}</strong>,</p>
        <p style="margin: 0 0 10px;">We hope you're doing well!</p>
        <p style="margin: 0 0 10px;">
          We wanted to inform you about your application for the <strong>${Jobtitle}</strong> position at <strong>${Companyname}</strong>.
        </p>
        <p style="margin: 16px 0;">
          <strong>Status Update:</strong> 
          <span style="display: inline-block; background-color: ${getStatusColor(
            Status
          )}20; color: ${getStatusColor(
    Status
  )}; font-weight: 600; padding: 6px 14px; border-radius: 20px;">
            ${Status}
          </span>
        </p>
        <p style="margin: 0 0 10px;">If you have any questions or need further details, feel free to reach out to us.</p>
        <p style="margin: 0 0 10px;">Thank you for your interest in joining our team.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="margin: 0 0 6px;">Best regards,</p>
        <p style="font-weight: 600; color: #374151; margin: 0;">${Companyname}</p>
        <p style="margin: 0;"><a href="mailto:${Companyemail}" style="color: #2563eb; text-decoration: none;">${Companyemail}</a></p>
      </div>
    </body>
  </html>
  `;
};

const sendWelcomeUserEmail = (userName, userRole) => {
  return `
  <html>
    <body style="font-family: 'Segoe UI', sans-serif; color: #111827; background-color: #f3f4f6; padding: 40px;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #d1d5db; border-radius: 10px; padding: 32px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color:rgb(0, 0, 0); margin-bottom: 20px;">Welcome to InternPilot! 🎉</h2>
        <p style="margin: 0 0 10px;">Hi <strong>${userName}</strong>,</p>
        <p style="margin: 0 0 16px;">
          We’re excited to have you onboard as a <strong>${userRole}</strong>. To help you get started, here are a few things to complete:
        </p>
        <ul style="padding-left: 20px; margin: 0 0 16px;">
          <li style="margin-bottom: 6px;">✅ Add your profile picture</li>
          <li style="margin-bottom: 6px;">✅ Update your contact details</li>
          <li style="margin-bottom: 6px;">✅ Set your preferences</li>
        </ul>
        <p style="margin: 0 0 10px;">
          If you have any questions, feel free to reach out to our support team at 
          <a href="mailto:support@internpilot.com" style="color: #2563eb; text-decoration: none;">support@internpilot.com</a>.
        </p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="margin: 0 0 6px;">Best regards,</p>
        <p style="font-weight: 600; color: #374151; margin: 0;">InternPilot Team</p>
      </div>
    </body>
  </html>
  `;
};
module.exports = { sendUpdateStatusEmail, sendWelcomeUserEmail };
