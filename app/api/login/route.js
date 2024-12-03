import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user"; // Assuming you have a User model

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use an environment variable

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to the database using Mongoose
    await dbConnect();

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Compare the password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }
console.log(user.userType)
    // Create a JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, userType: user.userType },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Return token and user type
    return new Response(JSON.stringify({ token, userType: user.userType }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
