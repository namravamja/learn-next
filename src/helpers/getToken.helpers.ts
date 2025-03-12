import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export const getToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    return error.message;
  }
};
