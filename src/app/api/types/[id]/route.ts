import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { db } from "@/lib/db";

// Cập nhật loại lốp
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data = await db.loai_lop.update({
    where: { id: Number(params.id) },
    data: { ten_loai_lop: body.ten_loai_lop },
  });
  return NextResponse.json(data);
}

// Xóa loại lốp
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await db.loai_lop.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: "Đã xóa thành công" });
}
