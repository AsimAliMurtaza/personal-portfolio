import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  id: string;
  title: string;
  content: string;
  image?: string;
  publishedAt: Date;
  author?: string;
}

const BlogSchema = new Schema<IBlog>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  publishedAt: { type: Date, required: true },
  author: { type: String },
});

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
