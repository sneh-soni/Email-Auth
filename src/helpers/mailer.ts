import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Create Token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //Update user in db according to emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //Create Transporter ==> user mailTrap here
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "eb3a61fffe0d38",
        pass: "ef27e24376099c",
      },
    });

    // Encode the hashedToken for URL
    const encodedToken = encodeURIComponent(hashedToken);

    //Create mail Options
    var mailOptions = {
      from: "ssneh20062003@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `
        <h1>Hello ${email}</h1>
        <p>Please click on the following link to ${
          emailType === "VERIFY" ? "Verify your email" : "Reset your Password"
        }</p>
        <a href="${process.env.DOMAIN}/verifyemail?token=${encodedToken}">${
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password"
      }</a>
      `,
    };

    //Send mail
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
