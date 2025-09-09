import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.san_pham.findMany({
      include: {
        thong_so_ac_quy: {
          select: {
            thuong_hieu: true,
            dien_ap: true,
            xuat_xu: true,
            loai_ac_quy: true,
          }
        },
        hinh_anh_san_pham: true,
      },
      
    });

    const formatted = products.map((p) => {
      // const gia = p.gia_lop[0]; // do take: 1, luôn là mảng có 1 phần tử

      return {
        id: p.id,
        ma_san_pham: p.ma_san_pham,
        ten_san_pham: p.ten_san_pham,
        slug: p.slug,
        mo_ta: p.mo_ta_chi_tiet,
        trang_thai: p.trang_thai,
        thong_so_ac_quy: p.thong_so_ac_quy,
        rating: p.rating,
       
        anh_dai_dien: p.anh_dai_dien,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return new NextResponse("Lỗi server", { status: 500 });
  }
}
