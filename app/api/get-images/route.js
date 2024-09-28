import { NextResponse } from "next/server";

async function handleSearchImg(searchImgKeyword) {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${searchImgKeyword}&engine=google_images&ijn=0&api_key=${process.env.SERP_API_KEY}`
    );

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    return data.images_results.map((img) => img.original) || [];
  } catch (error) {
    console.error("Error in handleSearchImg:", error);
    // throw new Error("Failed to fetch images from the API");
  }
}

export async function POST(request) {
  try {
    const { searchImgKeyword } = await request.json();

    const images = await handleSearchImg(searchImgKeyword);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error in getImg:", error);
    return NextResponse.json(
      { success: false, error: `error: ${error}` },
      { status: 500 }
    );
  }
}
