import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.san_pham.findMany({
      where: { thong_so_lop: { some: {} } },
      include: {
        thong_so_lop: {
          include: {
            kich_thuoc: { select: { ma_kich_thuoc: true } },
            loai_lop: { select: { ten_loai_lop: true } },
            thuong_hieu: { select: { ten_thuong_hieu: true } },
          },
        },
        hinh_anh_san_pham: true,
      },
    });

    const formatted = products.map((p) => ({
      id: p.id,
      ma_san_pham: p.ma_san_pham,
      ten_san_pham: p.ten_san_pham,
      slug: p.slug,
      mo_ta: p.mo_ta_chi_tiet,
      trang_thai: p.trang_thai,
      rating: p.rating,
      anh_dai_dien: p.anh_dai_dien,
      thong_so_lop: p.thong_so_lop,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách lốp:", error);
    return new NextResponse("Lỗi server", { status: 500 });
  }
}
