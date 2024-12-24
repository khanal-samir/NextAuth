import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return NextResponse.json(
        { error: "User doesnot exists" },
        { status: 400 },
      );
    }
    console.log(user);

    const validPassword = await bcryptjs.compare(password, user.password); //string and hash

    if (!validPassword)
      NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in sucessfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
