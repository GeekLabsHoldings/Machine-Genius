import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code, state, clientId, clientSecret, redirectUri } =
      await request.json();

    // TODO: Validate the 'state' parameter to protect against CSRF attacks
    // const clientId = "1189755995636220";
    // const clientSecret = "12354d026d96b0c7ee6ca1d68b4f5ad2"; // Store your client secret in an environment variable
    // const redirectUri = `/`;

    const tokenUrl =
      `https://graph.facebook.com/v16.0/oauth/access_token` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&client_secret=${clientSecret}` +
      `&code=${code}`;

    const response = await fetch(tokenUrl);
    const data = await response.json();

    if (data.access_token) {
      const accessToken = data.access_token;

      // TODO: Store the access token securely (e.g., in a database)

      return NextResponse.json({ success: true, access_token: accessToken });
    } else {
      // Handle errors returned by Facebook
      return NextResponse.json({ success: false, error: data.error });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
