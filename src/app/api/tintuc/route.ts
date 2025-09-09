import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // file prisma client

export async function GET() {
  try {
    const tinTuc = await db.tintuclopoto.findMany({
      orderBy: { ngay_dang: "desc" }, // bài mới nhất lên trước
    });
    return NextResponse.json(tinTuc);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy tin tức" }, { status: 500 });
  }
}
