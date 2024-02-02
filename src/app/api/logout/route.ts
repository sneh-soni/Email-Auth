import { NextResponse } from "next/server";

export async function GET() {
  try {
    //create nextResponse to interact with user cookies
    const response = NextResponse.json({
      message: "Logout Successfull",
      success: true,
    });

    //setting token to ""
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
