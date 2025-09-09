import { db } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const { kich_thuoc, hang_xe, ten_xe, doi_xe, thuong_hieu, loai_lop } = data;

  console.log("🔍 Dữ liệu API lốp:", data);

  try {
    // Điều kiện where động
    let whereCondition: any = {
      thong_so_lop: {
        some: {},
      },
    };

    // Nếu có kích thước → ưu tiên lọc theo kích thước
    if (kich_thuoc) {
      whereCondition.thong_so_lop.some.kich_thuoc = {
        ma_kich_thuoc: kich_thuoc,
      };
    } else if (hang_xe && ten_xe && doi_xe) {
      // Nếu không có kich_thuoc nhưng có thông tin xe
      const xe = await db.xe_oto.findFirst({
        where: { hang_xe, ten_xe, doi_xe },
        select: { kich_thuoc_lop: true },
      });

      if (!xe) {
        return Response.json({ success: false, data: [] });
      }

      whereCondition.thong_so_lop.some.kich_thuoc = {
        ma_kich_thuoc: xe.kich_thuoc_lop,
      };
    }

    // Nếu có thương hiệu → thêm vào filter
    if (thuong_hieu && thuong_hieu !="Toàn bộ") {
      whereCondition.thong_so_lop.some.thuong_hieu = {
        ten_thuong_hieu: thuong_hieu,
      };
    }

    // Nếu có loại lốp → thêm vào filter
    if (loai_lop && loai_lop !="Toàn bộ") {
      whereCondition.thong_so_lop.some.loai_lop = {
        ten_loai_lop: loai_lop,
      };
    }

    // Truy vấn sản phẩm
    const results = await db.san_pham.findMany({
      where: whereCondition,
      include: {
        thong_so_lop: {
          include: {
            kich_thuoc: true,
            thuong_hieu: true,
            loai_lop: true,
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
