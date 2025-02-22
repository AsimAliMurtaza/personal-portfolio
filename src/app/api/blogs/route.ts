import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ publishedAt: -1 }); // Fetch and sort by newest
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
