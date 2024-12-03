import { NextResponse } from "next/server"; // For Next.js 13+
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; // Ensure you have your secret key in .env

export async function GET(req) {
  const cookies = req.cookies; // Get cookies from the request
  console.log("Cookies:", cookies); // Log all cookies for debugging

  // Extract the token correctly
  const tokenObject = cookies.get("sellerToken"); // This is the cookie object
  const token = tokenObject ? tokenObject.value : null; // Get the value of the token

  console.log("Token:", token); // Log the token value

  if (!token || typeof token !== "string") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify the JWT and decode the user data
    const user = jwt.verify(token, SECRET_KEY);

    // Optionally, sanitize user data before sending back
    const { id, name, email, shopId } = user; // Adjust based on your token payload structure

    return NextResponse.json({ id, name, email, shopId }, { status: 200 });
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
