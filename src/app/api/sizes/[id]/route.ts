import { db } from "@/lib/db";
import { NextResponse } from "next/server";


// Cập nhật
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    
  const body = await req.json();
  const data = await db.kich_thuoc.update({
    where: { id: Number(params.id) },
    data: { ma_kich_thuoc: body.ma_kich_thuoc },
  });
  return NextResponse.json(data);
}

// Xóa
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await db.kich_thuoc.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: "Đã xóa thành công" });
}
