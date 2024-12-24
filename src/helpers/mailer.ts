import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO cofigure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // special characters might cause encodeing like space 20% so prevent using special characters

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPassTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        // auth should be in env
        user: "35c9fdea106b07",
        pass: "ffe027f2a0e809",
      },
    });

    const mailOptions = {
      from: "samir@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
          <h2 style="color: #333; text-align: center;">
            ${emailType === "VERIFY" ? "Verify Your Email Address" : "Reset Your Password"}
          </h2>
          <p style="font-size: 16px; color: #555;">
            ${
              emailType === "VERIFY"
                ? "Thank you for signing up! Please verify your email address to complete the registration process."
                : "We received a request to reset your password. Click the link below to reset it."
            }
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
               style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
               ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
            </a>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
            Or copy and paste this link into your browser:
          </p>
          <p style="font-size: 14px; color: #007bff; text-align: center; word-wrap: break-word;">
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            If you did not request this, please ignore this email. The link will expire soon.
          </p>
        </div>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
