import { NextRequest, NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

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
    console.log("Starting Twitter image upload process");

    // Log the content type of the request
    console.log("Request Content-Type:", req.headers.get("content-type"));

    const formData = await req.formData();
    console.log("Form data received");

    // Log all keys in the formData
    console.log("FormData keys:", Array.from(formData.keys()));

    const rawTwitterData = formData.get("twitterData");
    if (!rawTwitterData || typeof rawTwitterData !== "string") {
      console.error("Missing or invalid twitterData");
      return NextResponse.json(
        { error: "Missing or invalid twitterData" },
        { status: 400 }
      );
    }

    let twitterData: TwitterDataResponse;
    try {
      twitterData = JSON.parse(rawTwitterData);
      console.log("Twitter data parsed successfully");
    } catch (e) {
      console.error("Failed to parse twitterData:", e);
      return NextResponse.json(
        { error: "twitterData must be a valid JSON string" },
        { status: 400 }
      );
    }

    // Validate Twitter data structure
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
      console.error("Invalid twitterData structure:", JSON.stringify(twitterData));
      return NextResponse.json(
        { error: "Invalid twitterData structure" },
        { status: 400 }
      );
    }

    const { ConsumerKey, ConsumerSecret, AccessToken, TokenSecret } =
      twitterData.account;

    // Check for file in formData
    const file = formData.get("media");
    console.log("File object type:", file ? typeof file : "undefined");
    console.log("Is File instance:", file instanceof File);

    if (!file) {
      console.error("No file found in form data");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      console.error("Uploaded item is not a File instance");
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 }
      );
    }

    console.log("File received:", file.name, "Size:", file.size, "bytes");

    // Read file as ArrayBuffer
    let arrayBuffer: ArrayBuffer;
    try {
      arrayBuffer = await file.arrayBuffer();
      console.log("File successfully read as ArrayBuffer");
    } catch (error) {
      console.error("Error reading file as ArrayBuffer:", error);
      return NextResponse.json(
        { error: "Failed to read uploaded file" },
        { status: 500 }
      );
    }

    const fileBuffer = Buffer.from(arrayBuffer);
    console.log("File buffer created, size:", fileBuffer.length, "bytes");

    // Create OAuth object and prepare request
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
        media: fileBuffer.toString("base64"),
      },
    };

    const headers = oauth.toHeader(
      oauth.authorize(requestData, { key: AccessToken, secret: TokenSecret })
    );

    console.log("OAuth headers generated");

    const body = new URLSearchParams();
    body.append("media", requestData.data.media);

    console.log("Sending request to Twitter API");

    // Make request to Twitter API
    const response = await fetch(requestData.url, {
      method: requestData.method,
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    console.log("Response received from Twitter API. Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Twitter upload failed:", errorText);
      return NextResponse.json(
        { error: "Twitter upload failed", details: errorText },
        { status: response.status }
      );
    }

    const twitterResponse = await response.json();
    console.log("Twitter upload successful:", JSON.stringify(twitterResponse));

    return NextResponse.json(twitterResponse, { status: 200 });
  } catch (error: any) {
    console.error("Unhandled error in upload-image API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}