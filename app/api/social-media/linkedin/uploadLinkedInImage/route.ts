import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { uploadUrl, token, file } = await req.json();

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "image/jpeg",
        "media-type-family": "STILLIMAGE",
      },
      body: Buffer.from(file, "base64"), // Assuming the file is sent as base64
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        status: response.status,
        message: errorText,
      });
    }
  } catch (error) {
    console.error("Error uploading image to LinkedIn:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
