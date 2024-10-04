import { NextRequest, NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

// Disable Next.js's default body parsing (optional if not using middleware)
// export const bodyParser = false;

// deprecated
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Define the shape of your Twitter data sent from the client
interface TwitterAccount {
  ConsumerKey: string;
  ConsumerSecret: string;
  AccessToken: string;
  TokenSecret: string;
  BearerToken: string;
}

interface TwitterDataResponse {
  platform: string;
  account: TwitterAccount;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming form data using NextRequest's formData API
    const formData = await req.formData();

    // Extract and validate twitterData
    const rawTwitterData = formData.get("twitterData");
    if (!rawTwitterData || typeof rawTwitterData !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid twitterData" },
        { status: 400 }
      );
    }

    let twitterData: TwitterDataResponse;
    try {
      twitterData = JSON.parse(rawTwitterData);
    } catch (e) {
      return NextResponse.json(
        { error: "twitterData must be a valid JSON string" },
        { status: 400 }
      );
    }

    // Validate the structure of twitterData
    if (
      !twitterData.platform ||
      twitterData.platform !== "TWITTER" ||
      !twitterData.account ||
      typeof twitterData.account.ConsumerKey !== "string" ||
      typeof twitterData.account.ConsumerSecret !== "string" ||
      typeof twitterData.account.AccessToken !== "string" ||
      typeof twitterData.account.TokenSecret !== "string" ||
      typeof twitterData.account.BearerToken !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid twitterData structure" },
        { status: 400 }
      );
    }

    const { ConsumerKey, ConsumerSecret, AccessToken, TokenSecret } =
      twitterData.account;

    // Extract and validate the file from the parsed form
    const file = formData.get("media");
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file format" },
        { status: 400 }
      );
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const arrayBuffer = await file.arrayBuffer();
    if (arrayBuffer.byteLength > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File size exceeds the 5MB limit." },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(arrayBuffer);

    // Initialize OAuth 1.0a
    const oauth = new OAuth({
      consumer: { key: ConsumerKey, secret: ConsumerSecret },
      signature_method: "HMAC-SHA1",
      hash_function(baseString, key) {
        return crypto
          .createHmac("sha1", key)
          .update(baseString)
          .digest("base64");
      },
    });

    const requestData = {
      url: "https://upload.twitter.com/1.1/media/upload.json",
      method: "POST",
      data: {
        media: fileBuffer.toString("base64"), // Twitter expects media as base64-encoded string for simple uploads
      },
    };

    // Generate headers
    const headers = oauth.toHeader(
      oauth.authorize(requestData, { key: AccessToken, secret: TokenSecret })
    );

    // Prepare URL-encoded body for Twitter
    const body = new URLSearchParams();
    body.append("media", requestData.data.media);

    // Make the request to Twitter
    const response = await fetch(requestData.url, {
      method: requestData.method,
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Twitter upload failed:", errorText);
      return NextResponse.json(
        { error: "Twitter upload failed", details: errorText },
        { status: response.status }
      );
    }

    const twitterResponse = await response.json();

    // Optionally, return the Twitter media ID or other relevant info
    return NextResponse.json(twitterResponse, { status: 200 });
  } catch (error: any) {
    console.error("Error in upload-image API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
