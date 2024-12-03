import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to the database using Mongoose
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user with userType
    const newUser = new User({
      email,
      password: hashedPassword,
      userType: "user", // Default userType for regular users
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
