import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Derek Blidy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${baseUrl}/Main%20photos/alien.jpeg`}
        alt="Derek Blidy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    { ...size }
  );
}
