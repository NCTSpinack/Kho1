import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Lấy tất cả thương hiệu
export async function GET() {
  const data = await db.thuong_hieu.findMany();
  return NextResponse.json(data);
}

// Thêm mới
export async function POST(req: Request) {
  const body = await req.json();
  const data = await db.thuong_hieu.create({
    data: {
      ten_thuong_hieu: body.ten_thuong_hieu,
    },
  });
  return NextResponse.json(data);
}
