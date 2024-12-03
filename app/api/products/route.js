import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, mrp, disPrice, disPercentage, image, category } =
      await req.json();

    const newProduct = new Product({
      name,
      mrp,
      disPrice,
      disPercentage,
      image,
      category,
    });

    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Error adding product" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const productId = url.searchParams.get("id");

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
      });
    }

    await Product.findByIdAndDelete(productId);
    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: "Error deleting product" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const productId = url.searchParams.get("id");

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), {
        status: 400,
      });
    }

    const updatedData = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Error updating product" }), {
      status: 500,
    });
  }
}
