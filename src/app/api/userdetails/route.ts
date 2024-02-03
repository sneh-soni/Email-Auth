import connect from "@/app/database/databaseConfig";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    //Get userId using getUserFromToken
    const userId = await getUserFromToken(request);

    //Get user details from userId
    const user = await User.findOne({ _id: userId });

    return NextResponse.json({
      message: "User Found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 400,
    });
  }
}
