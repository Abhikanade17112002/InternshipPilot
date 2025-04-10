const nodemailer = require("nodemailer");
const {
  sendUpdateStatusEmail,
  sendWelcomeUserEmail,
} = require("./emailTemplate");

const sendEmail = async (data) => {
  const updateSubject = "Update on Your Application Status";
  const registrationSubject =
    "Welcome to InternPilot 🎉 – Complete Your Profile";
  console.log("DATAAAA", data);

  if (data.subject == "REGISTRATION") {
    try {
      // Create a transporter object
      let transporter = nodemailer.createTransport({
        service: "gmail", // Use "smtp.example.com" for custom SMTP servers
        auth: {
          user: process.env.EMAIL, // Your email (must be verified in SMTP)
          pass: process.env.PASSWORD, // Your App Password
        },
      });

      let mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        headers: {
          "Message-ID": `<${Date.now() + Math.random()}@yourcompany.com>`, // Unique email ID
          References: `<${Date.now() + Math.random()}@yourcompany.com>`, // Avoids threading
          "In-Reply-To": `<${Date.now() + Math.random()}@yourcompany.com>`, // Ensures a new thread
        },
        subject: registrationSubject,
        html: sendWelcomeUserEmail(data.name, data.role),
      };

      // // Send email
      let info = await transporter.sendMail(mailOptions);
      console.log("Welcome Email sent successfully:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  } else if (data.subject == "STATUSUPDATE") {
    console.log(data, "DATA");

    try {
      // Create a transporter object
      let transporter = nodemailer.createTransport({
        service: "gmail", // Use "smtp.example.com" for custom SMTP servers
        auth: {
          user: process.env.EMAIL, // Your email (must be verified in SMTP)
          pass: process.env.PASSWORD, // Your App Password
        },
      });

      // // Email options
      let mailOptions = {
        from: process.env.EMAIL,
        to: data.emailId,
        headers: {
          "Message-ID": `<${Date.now() + Math.random()}@yourcompany.com>`, // Unique email ID
          References: `<${Date.now() + Math.random()}@yourcompany.com>`, // Avoids threading
          "In-Reply-To": `<${Date.now() + Math.random()}@yourcompany.com>`, // Ensures a new thread
        },
        subject: updateSubject,
        html: sendUpdateStatusEmail(
          data?.status,
          data?.name,
          data?.jobTitle,
          data?.companyName,
          data?.companyEmail
        ), // You can use plain text by replacing `html` with `text`
      };

      // // Send email
      let info = await transporter.sendMail(mailOptions);
      console.log("Update Email sent successfully:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
};

module.exports = sendEmail;
