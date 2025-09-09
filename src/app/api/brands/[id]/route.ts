import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Cập nhật
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const data = await db.thuong_hieu.update({
    where: { id: Number(id) },
    data: { ten_thuong_hieu: body.ten_thuong_hieu },
  });
  return NextResponse.json(data);
}

// Xóa
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await db.thuong_hieu.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Đã xóa thành công" });
}
