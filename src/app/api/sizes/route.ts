// /app/api/kichthuoc/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lấy tất cả kích thước
export async function GET() {
  const data = await db.kich_thuoc.findMany();
  return NextResponse.json(data);
}

// Thêm mới
export async function POST(req: Request) {
  const body = await req.json();
  const data = await db.kich_thuoc.create({
    data: {
      ma_kich_thuoc: body.ma_kich_thuoc,
    },
  });
  return NextResponse.json(data);
}
