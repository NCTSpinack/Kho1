import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      ten_lop,
      slug,
      thuong_hieu_id,
      kich_thuoc_id,
      loai_lop_id,
      xuat_xu,
      so_luong,
      mo_ta_chi_tiet,
      ngay_tao,
      ngay_cap_nhat,
      anh_dai_dien,
      hinh_anh,
      gia_nhap,
      gia_ban,
    } = data;

    // 1. Insert vào bảng lốp
    const newLop = await db.lop_oto.create({
      data: {
        ten_lop: ten_lop,
        slug: slug,
        thuong_hieu_id: Number(thuong_hieu_id),
        kich_thuoc_id: Number(kich_thuoc_id),
        loai_lop_id: Number(loai_lop_id),
        xuat_xu: xuat_xu,
        so_luong: so_luong,
        anh_dai_dien: anh_dai_dien,
        mo_ta_chi_tiet: mo_ta_chi_tiet,
        ngay_tao: new Date(ngay_tao),
        ngay_cap_nhat: new Date(ngay_cap_nhat),
      },
    });

    // 2. Thêm ảnh (nếu có)
    console.error("Lỗi khi thêm lốp:", newLop.id);
    // console.log("Danh sách ảnh:", hinh_anh);
    // 2.1 ảnh lưu vào local trước rồi trả về url của ảnh

    if (hinh_anh && hinh_anh.length > 0) {
      await db.anh_lop.createMany({
        data: hinh_anh.map((url: string) => ({
          url_anh: url,
          lop_id: newLop.id,
        })),
      });
    }

    // 3. Thêm giá lốp
    await db.gia_lop.create({
      data: {
        gia_nhap: Number(gia_nhap),
        gia_ban: gia_ban ? Number(gia_ban) : null,
        lop_id: newLop.id,
      },
    });

    return NextResponse.json({ success: true, lop: newLop }, { status: 201 });
  } catch (error: any) {
    console.error("Lỗi khi thêm lốp:", error);

    // Các lỗi khác
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await db.lop_oto.findMany({
      include: {
        anh_lop: true,
        gia_lop: true,
      },
      orderBy: {
        ngay_tao: "desc",
      },
    });

    const formatted = products.map((p) => {
      const gia = p.gia_lop[0]; // do take: 1, luôn là mảng có 1 phần tử

      return {
        id: p.id,
        ten_lop: p.ten_lop,
        anh_dai_dien: p.anh_dai_dien,
        // mo_ta_chi_tiet: p.mo_ta_chi_tiet,
        slug: p.slug,
        gia_ban: gia?.gia_ban
          ? `${gia.gia_ban.toNumber().toLocaleString("vi-VN")} VNĐ`
          : "Chưa có giá",
        gia_cu: gia?.gia_cu
          ?`${gia.gia_cu.toNumber().toLocaleString("vi-VN")} VNĐ`
          :" chưa có ",
        giam_gia: gia.giam_gia,
        // images: p.anh_lop.map((img) => img.url_anh),
        rating: p.rating,
        ngay_tao: p.ngay_tao,
        trang_thai: p.trang_thai,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return new NextResponse("Lỗi server", { status: 500 });
  }
}
