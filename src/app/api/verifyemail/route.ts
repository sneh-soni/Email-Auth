import connect from "@/app/database/databaseConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    //Get data from request
    const reqBody = await request.json();
    const { token } = reqBody;

    //Get the user
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    //User Does'nt exist
    if (!user) {
      return NextResponse.json({
        error: "User Does not exists",
        status: 400,
      });
    }

    //Update user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "User Verified Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
