import connect from "@/app/database/databaseConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

//connect to DB
connect();

export async function POST(request: NextRequest) {
  try {
    //Get data from request
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    //return response
    return NextResponse.json({
      message: "User saved Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    //return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
