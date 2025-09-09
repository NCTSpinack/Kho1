import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const product = await db.lop_oto.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      anh_lop: true,
      gia_lop: true,
      loai_lop: true,
      thuong_hieu: true,
      thong_so_lop: true,
      kich_thuoc: true,
    },
    orderBy: {
      ngay_cap_nhat: "desc",
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  const gia = product.gia_lop[0];
  const thuong_hieu= product.thuong_hieu;
  const loai_lop = product.loai_lop;
  const thong_so_lop = product.thong_so_lop;
  const kich_thuoc =product.kich_thuoc;

  return NextResponse.json({
    id: product.id,
    ten_lop: product.ten_lop,
    xuat_xu: product.xuat_xu,
    trang_thai: product.trang_thai,
    thuong_hieu: thuong_hieu?.ten_thuong_hieu,
    loai_lop: loai_lop?.ten_loai_lop,
    
    kich_thuoc: kich_thuoc?.ma_kich_thuoc,

    slug: product.slug,
    price: gia?.gia_ban
      ? `${gia.gia_ban.toNumber().toLocaleString("vi-VN")} VNĐ`
      : "Chưa có giá",

    images: product.anh_lop.map((img) => img.url_anh),
    mo_ta: product.mo_ta_chi_tiet,
  });
}
