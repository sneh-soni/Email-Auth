import connect from "@/app/database/databaseConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    //Get data from request
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user does not exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User Does not exists",
        status: 400,
      });
    }
    console.log(user);

    // check if password is valid or not
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        error: "Invalid Password",
        status: 402,
      });
    }

    //create Token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    //create response
    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
    });

    //setting token into user's cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
