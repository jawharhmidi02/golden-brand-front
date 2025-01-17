import { escapeOutput } from "@/lib/utils";
import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");

function validateRequired(field, fieldName) {
  if (!field || !field.trim()) {
    throw new Error(`${fieldName} is required`);
  }
  return field.trim();
}

export async function POST(request) {
  const receiver = process.env.NEXT_PUBLIC_EMAIL_RECEIVER;
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  try {
    const formData = await request.formData();
    const name = escapeOutput(validateRequired(formData.get("name"), "Name"));
    const email = escapeOutput(
      validateRequired(formData.get("email"), "Email"),
    );
    const phone = escapeOutput(
      validateRequired(formData.get("phone"), "Phone"),
    );
    const address = escapeOutput(
      formData.get("address")?.trim() || "Not provided",
    );
    const subject = escapeOutput(
      formData.get("subject")?.trim() || "Not provided",
    );
    const message = escapeOutput(
      validateRequired(formData.get("message"), "Message"),
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });

    const mail = await transporter.sendMail({
      from: username,
      to: receiver,
      subject: `New Contact Request: ${name} - ${subject}`,
      html: `<div style="font-family: Arial, sans-serif; color: #064e3b; padding: 20px; background-color: #e9eaec;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
            <header style="background-color: #059669; padding: 20px; text-align: center; color: #fff;">
              <h3 style="margin: 0; font-size: 24px;">New Contact Request</h3>
              <p style="font-size: 16px; margin: 5px 0;">
                You have received a message from your website
              </p>
            </header>
            <section style="padding: 20px;">
              <div style="background-color: #ffd700; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                <h4 style="margin: 0; color: #064e3b;">Contact Information</h4>
              </div>
              
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Name:</strong> ${name}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Phone:</strong> ${phone}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Address:</strong> ${address}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Topic:</strong> ${subject}
              </p>

              <div style="background-color: #ffd700; padding: 10px; margin: 20px 0; border-radius: 5px;">
                <h4 style="margin: 0; color: #064e3b;">Message Content</h4>
              </div>
              
              <div style="padding: 15px; background-color: #e9eaec; border-left: 4px solid #059669; font-size: 16px; line-height: 1.8;">
                ${message}
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: #90adc6; border-radius: 5px; color: #064e3b;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Submission Time:</strong> ${new Date().toLocaleString()}
                </p>
              </div>
            </section>
            <footer style="background-color: #90adc6; padding: 15px; text-align: center; color: #064e3b;">
              <p style="margin: 0; font-size: 14px;">
                Thank you for using our service! For more information, please visit our website.
              </p>
              <p style="margin: 0; font-size: 14px;">Best regards, Golden Brand</p>
            </footer>
          </div>
        </div>`,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.status(500).json({
      message: error.message || "Failed to send message",
    });
  }
}
