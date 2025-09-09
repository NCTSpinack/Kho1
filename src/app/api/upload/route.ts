import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "images", filename);

    await writeFile(filePath, buffer);
    uploadedUrls.push(`/images/${filename}`); // 👈 Trả về URL để lưu vào DB
  }

  return NextResponse.json({ urls: uploadedUrls });
}
