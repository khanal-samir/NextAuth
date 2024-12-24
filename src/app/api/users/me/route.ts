import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connectDB();
export const GET = async (request: NextRequest) => {
  try {
    console.log(request);

    const userId = await getDataFromToken(request);
    console.log("userId", userId);

    const user = await User.findById(userId).select("-password");
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    console.log("userssss", user);

    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
