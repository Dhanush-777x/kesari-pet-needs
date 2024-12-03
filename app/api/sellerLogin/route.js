// app/api/sellerLogin/route.js
import dbConnect from "@/lib/mongodb"; // Adjust your path
import Seller from "@/models/seller"; // Adjust your path
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database before handling requests
const connectDb = async () => {
  await dbConnect();
};

export const POST = async (req) => {
  await connectDb();

  const { email, password } = await req.json(); // Parse the request body

  try {
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Check if the seller is verified
    if (!seller.isVerified) {
      return new Response(
        JSON.stringify({ error: "Seller account is not verified" }),
        { status: 403 }
      );
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error during seller login:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
