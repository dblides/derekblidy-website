import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Derek Blidy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default function Image() {
  const imgBuffer = readFileSync(
    join(process.cwd(), "public", "Main photos", "alien.jpeg")
  );
  const base64 = imgBuffer.toString("base64");
  const src = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Derek Blidy"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
    { ...size }
  );
}
