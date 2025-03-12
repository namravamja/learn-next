import { connect } from "@/dbConfig/dnConfig";
import { sendMail } from "@/helpers/mailer.helpers";
import User from "@/models/user.model.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    // password hashing
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    // save user
    const savedUser = await new User({
      username,
      email,
      password: encryptedPassword,
    }).save();

    await sendMail({ email, emailType: "VERIFY", userID: savedUser._id });

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
