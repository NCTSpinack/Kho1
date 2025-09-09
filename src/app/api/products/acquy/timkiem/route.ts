import { db } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const { dung_luong, thuong_hieu, hang_xe, ten_xe, doi_xe } = data;

  console.log("🔍 Dữ liệu API:", data);

  try {
    // Điều kiện lọc động
    let whereCondition: any = {};

    // Nếu có dung_luong hoặc thuong_hieu thì thêm vào filter
    if (dung_luong || thuong_hieu) {
      whereCondition = {
        thong_so_ac_quy: {
          some: {
            ...(dung_luong && { dung_luong }),
            ...(thuong_hieu && { thuong_hieu }),
          },
        },
      };
    } else if (hang_xe && ten_xe && doi_xe) {
      // Nếu không truyền dung_luong & thuong_hieu => lấy theo xe
      const xe = await db.xe_oto.findFirst({
        where: { hang_xe, ten_xe, doi_xe },
        select: { dung_luong_ac_quy: true },
      });

      if (!xe) {
        return Response.json({ success: false, data: [] });
      }

      whereCondition = {
        thong_so_ac_quy: {
          some: { dung_luong: xe.dung_luong_ac_quy },
        },
      };
    }

    // Truy vấn sản phẩm
    const results = await db.san_pham.findMany({
      where: whereCondition,
      include: {
        thong_so_ac_quy: {
          select: {
            thuong_hieu: true,
            dien_ap: true,
            xuat_xu: true,
            loai_ac_quy: true,
            dung_luong: true,
          },
        },
      },
    });

    return Response.json({ success: true, data: results });
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm:", error);
    return Response.json({ error: "Lỗi xử lý tìm kiếm" }, { status: 500 });
  }
}
