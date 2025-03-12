import { connect } from "@/dbConfig/dnConfig";
import { getToken } from "@/helpers/getToken.helpers";
import User from "@/models/user.model";
import { NextResponse, type NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = await getToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");

    return NextResponse.json({ message: "user found ", data: user });
  } catch (e: any) {
    return { error: e.message };
  }
}
