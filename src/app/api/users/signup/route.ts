// nextjs is edge computing doesnt have its own server runs on nearest server
// so each routes needs db connection as only functions are being deployed on Vercel

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation--zod
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 },
      );
    }
    //salt gen and password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser?._id });

    return NextResponse.json({
      message: "User registered Successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
