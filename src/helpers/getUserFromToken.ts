import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getUserFromToken(request: NextRequest) {
  try {
    //Get token from user cookies
    const token = request.cookies.get("token")?.value || "";

    //jwt.verify ==> verifies token and returns token's data
    // ! imp in ts
    const tokenData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //type: any ==> not good but must here, since ts dont know tokenData's type

    return tokenData.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
