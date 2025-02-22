import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // Ensure you have a function to connect to MongoDB
import {Blog} from "@/models/Blog"; // Import your Mongoose model

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    
    // Fetch blog using custom `id` field
    const blog = await Blog.findOne({ id: params.id });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
