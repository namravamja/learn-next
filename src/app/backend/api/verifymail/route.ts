import { connect } from "@/dbConfig/dnConfig";
import User from "@/models/user.model";
import { NextResponse, type NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        error: "Token is invalid or expired",
        status: 400,
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      status: 200,
    });
    
  } catch (error: any) {
    console.log(error.message);
  }
}
