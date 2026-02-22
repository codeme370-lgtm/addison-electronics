import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";

// Upload image and return URL
export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const storeId = await authSeller(userId);
    if (!storeId) {
      return NextResponse.json(
        { error: "you are not authorized to perform this action" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    // Convert file to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", dataURI);
    cloudinaryFormData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET || "jeeshop");
    cloudinaryFormData.append("folder", "jeeshop/products");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Cloudinary upload failed");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      return NextResponse.json(
        { imageUrl, message: "Image uploaded successfully" },
        { status: 200 }
      );
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return NextResponse.json(
        { error: uploadError.message || "Failed to upload image to Cloudinary" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("image:upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
