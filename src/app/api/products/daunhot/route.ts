import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.san_pham.findMany({
      include: {
        hinh_anh_san_pham: true,
        
      },
      where:{
        loai: "dau",
      }
      
    });

    const formatted = products.map((p) => {
      // const gia = p.gia_lop[0]; // do take: 1, luôn là mảng có 1 phần tử

      return {
        id: p.id,
        ten_san_pham: p.ten_san_pham,
        slug: p.slug,
        loai: p.loai,
        mo_ta: p.mo_ta,
        thuong_hieu: p.thuong_hieu,
        xuat_xu: p.xuat_xu,
        rating: p.rating,
        trang_thai: p.trang_thai,
        anh_dai_dien: p.anh_dai_dien,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return new NextResponse("Lỗi server", { status: 500 });
  }
}
