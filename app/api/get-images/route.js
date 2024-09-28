import { NextResponse } from "next/server";

const SERP_API_KEY = process.env.SERP_API_KEY;

if (!SERP_API_KEY) {
  throw new Error("SERP_API_KEY is not set in environment variables");
}

async function handleSearchImg(searchImgKeyword) {
  const encodedKeyword = encodeURIComponent(searchImgKeyword);
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${encodedKeyword}&engine=google_images&ijn=0&api_key=${SERP_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.images_results.map((img) => img.original) || [];
  } catch (error) {
    console.error("Error in handleSearchImg:", error);
    throw new Error("Failed to fetch images from the API");
  }
}

export async function POST(request) {
  try {
    const { searchImgKeyword } = await request.json();

    if (
      !searchImgKeyword ||
      typeof searchImgKeyword !== "string" ||
      searchImgKeyword.trim() === ""
    ) {
      return NextResponse.json(
        { success: false, error: "Valid search keyword is required" },
        { status: 400 }
      );
    }

    const images = await handleSearchImg(searchImgKeyword);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error in getImg:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
