import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { db } from "@/lib/db";

// Lấy tất cả loại lốp
export async function GET() {
  const data = await db.loai_lop.findMany();
  return NextResponse.json(data);
}

// Thêm mới loại lốp
export async function POST(req: Request) {
  const body = await req.json();
  const data = await db.loai_lop.create({
    data: {
      ten_loai_lop: body.ten_loai_lop,
    },
  });
  return NextResponse.json(data);
}
