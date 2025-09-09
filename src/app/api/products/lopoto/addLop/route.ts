import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      ten_san_pham,
      ma_san_pham,
      slug,
      so_luong,
      anh_dai_dien,
      mo_ta_chi_tiet,
      rating,
      luot_xem,
      ngay_tao,
      ngay_cap_nhat,
      trang_thai,

      thuong_hieu_id,
      kich_thuoc_id,
      loai_lop_id,
      xuat_xu,
      hoa_lop,
      nam_sx,
      chung_loai,

      gia_nhap,
      gia_ban,
      hinh_anh,
    } = data;

    // 1. Insert vào bảng lốp
    const newLop = await db.san_pham.create({
      data: {
        ten_san_pham:ten_san_pham,
        ma_san_pham: ma_san_pham,
        slug: slug,
        so_luong: so_luong,
        anh_dai_dien: anh_dai_dien,
        mo_ta_chi_tiet: mo_ta_chi_tiet,
        rating: rating,
        luot_xem: luot_xem,
        trang_thai: trang_thai,
        ngay_tao: new Date(ngay_tao),
        ngay_cap_nhat: new Date(ngay_cap_nhat),
      },
    });

    // 2. Thêm ảnh (nếu có)
    console.error("Lỗi khi thêm lốp:", newLop.id);
    // console.log("Danh sách ảnh:", hinh_anh);

    //thêm thông số lốp
    await db.thong_so_lop.createMany({
        data:{
            lop_id: newLop.id,
            kich_thuoc_id: kich_thuoc_id,
            thuong_hieu_id: thuong_hieu_id,
            loai_lop_id: loai_lop_id,
            xuat_xu: xuat_xu,
            nam_sx: nam_sx,
            hoa_lop: hoa_lop

        }
    })
    // 2.1 ảnh lưu vào local trước rồi trả về url của ảnh

    if (hinh_anh && hinh_anh.length > 0) {
      await db.hinh_anh_san_pham.createMany({
        data: hinh_anh.map((url: string) => ({
          url_anh: url,
          lop_id: newLop.id,
        })),
      });
    }

    // 3. Thêm giá lốp
    await db.gia_san_pham.create({
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


