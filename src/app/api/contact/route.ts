import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MESSAGES_FILE = path.join(process.cwd(), "src", "data", "messages.json");
const RECIPIENT_EMAIL = "dhruvdhruv5594@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const newMessage = {
      id: "msg_" + Date.now(),
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    };

    // 1. Log to server terminal
    console.log("📬 New Contact Form Submission:", newMessage);

    // 2. Persist to local messages.json file as backup
    try {
      let existingMessages = [];
      try {
        const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
        existingMessages = JSON.parse(fileContent);
      } catch {
        existingMessages = [];
      }

      existingMessages.push(newMessage);
      await fs.writeFile(MESSAGES_FILE, JSON.stringify(existingMessages, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Could not save to messages.json file:", fsErr);
    }

    // 3. Directly dispatch email to dhruvdhruv5594@gmail.com via FormSubmit service
    let emailDelivered = false;
    let serviceResponse: any = null;

    try {
      const emailRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://dhruv-patel-portfolio.com",
          Origin: "https://dhruv-patel-portfolio.com",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio Message from ${name} (${email})`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        }),
      });

      serviceResponse = await emailRes.json().catch(() => ({}));
      console.log("Direct Email Dispatch Result:", serviceResponse);
      if (emailRes.ok) {
        emailDelivered = true;
      }
    } catch (dispatchErr) {
      console.warn("Direct email delivery attempt warning:", dispatchErr);
    }

    return NextResponse.json({
      success: true,
      emailDelivered,
      serviceResponse,
      recipient: RECIPIENT_EMAIL,
      message: "Message dispatched directly to " + RECIPIENT_EMAIL,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
