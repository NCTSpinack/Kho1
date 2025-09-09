"use client";

import { useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";
import { toSeoSlug } from "@/components/slugHelper"; // import hàm tạo slug
import AnhDaiDienPopup from "@/components/AnhDaiDienPopup";
import { Autocomplete, TextField } from "@mui/material";

export default function AddTireForm() {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  type Brand = {
    id: number;
    ten_thuong_hieu: string;
  };
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  type Size = {
    id: number;
    ma_kich_thuoc: string;
  };
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectSizesId, setSelectedSizeId] = useState<number | null>(null);

  const [types, setTypes] = useState([]);
  const [selectedTypesId, setSelectedTypesId] = useState("");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [anhDaiDien, setAnhDaiDien] = useState<string | null>(null);
  // lấy dữ liệu từ form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang

    const formData = new FormData(e.currentTarget);

    const product = {
      ten_san_pham: formData.get("tieu_de"),
      ma_san_pham: formData.get("ma_san_pham"),
      slug: slug,
      so_luong: Number(formData.get("so_luong")),
      anh_dai_dien: anhDaiDien,
      mo_ta_chi_tiet: description, // lấy từ state
      rating: 5,
      luot_xem: 1,
      ngay_tao: formData.get("ngay_tao"),
      ngay_cap_nhat: formData.get("ngay_cap_nhat"),
      trang_thai: 1,

      thuong_hieu_id: selectedBrandId,
      kich_thuoc_id: selectSizesId,
      loai_lop_id: selectedTypesId,
      xuat_xu: formData.get("xuat_xu"),
      hoa_lop: formData.get("hoa_lop"),
      nam_sx: formData.get("nam_sx"),
      chung_loai: formData.get("chung_loai"),

      gia_nhap: Number(formData.get("gia_nhap")),
      gia_ban: Number(formData.get("gia_ban")),

      hinh_anh: imageUrls, // lấy từ state
    };

    console.log("Dữ liệu sản phẩm:", product);
    // Gửi dữ liệu đến API
    const res = await fetch("/api/productsLop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Thêm sản phẩm thành công!");
    } else {
      alert("Lỗi khi thêm sản phẩm!");
    }
  };

  const insertImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = async () => {
      const files = input.files;
      if (!files || files.length === 0) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]); // 👈 'images' là key upload ở server
      }

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload ảnh thất bại");

        const data = await res.json();

        if (data && data.urls) {
          setImageUrls((prev) => [...prev, ...data.urls]); // ✅ Cập nhật danh sách URL ảnh đã lưu local
        }
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
      }
    };

    input.click();
  };
  const handleDeleteImage = (indexToDelete: number) => {
    const updated = imageUrls.filter((_, index) => index !== indexToDelete);
    setImageUrls(updated);
  };
  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then(setBrands);
    fetch("/api/sizes")
      .then((res) => res.json())
      .then(setSizes);
    fetch("/api/types")
      .then((res) => res.json())
      .then(setTypes);
  }, []);
  useEffect(() => {
    const generatedSlug = toSeoSlug(name);
    setSlug(generatedSlug);
  }, [name]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-6 w-full h-full flex flex-col bg-white rounded-2xl shadow-md border border-gray-200"
      >
        {/* Tiêu đề sản phẩm */}
        <div className="mb-6">
          <label className="text-lg font-bold mb-2 block text-gray-800">
            Tiêu đề sản phẩm:
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-3xl">☆</span>
            <input
              name="tieu_de"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Lốp ô tô Michelin"
              className="border-b-2 border-teal-500 focus:outline-none focus:border-teal-600 text-gray-900 text-lg placeholder:text-gray-400 w-full py-1"
            />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <label className="font-medium text-sm text-gray-700">
              Seo url:
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)} // cho phép sửa
              className="flex-1 p-2 rounded bg-gray-50 text-blue-700 text-sm border border-gray-200"
            />
          </div>
        </div>

        {/* Grid 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Cột trái */}
          <div className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Mã sản phẩm
              </label>
              <input
                type="text"
                name="ma_san_pham"
                placeholder="Mã sản phẩm: "
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Thương hiệu
              </label>
              <Autocomplete
                options={brands}
                getOptionLabel={(option) => option.ten_thuong_hieu}
                value={
                  brands.find((s: any) => s.id === selectedBrandId) || null
                }
                onChange={(_, newValue) => {
                  if (newValue) {
                    setSelectedBrandId(newValue.id); // lưu id để insert DB
                  } else {
                    setSelectedBrandId(null);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn kích thước"
                    variant="outlined"
                    size="small"
                    className="bg-white rounded "
                  />
                )}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Kích thước
              </label>

              <Autocomplete
                options={sizes}
                getOptionLabel={(option) => option.ma_kich_thuoc}
                value={sizes.find((s: any) => s.id === selectSizesId) || null}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setSelectedSizeId(newValue.id);
                  } else {
                    setSelectedSizeId(null);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn kích thước"
                    variant="outlined"
                    size="small"
                    className="bg-white rounded "
                  />
                )}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Loại lốp
              </label>
              <select
                className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                value={selectedTypesId}
                onChange={(e) => setSelectedTypesId(e.target.value)}
              >
                {types.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.ten_loai_lop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Chủng loại
              </label>
              <input
                type="text"
                name="chung_loai"
                placeholder="VD: Hàng chống xịt..."
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Số lượng
              </label>
              <input
                type="number"
                name="so_luong"
                placeholder="Số lượng"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className=" flex gap-5">
              <div className="w-1/2">
                <label className="block font-semibold text-gray-700 mb-1">
                  Xuất xứ
                </label>
                <input
                  type="text"
                  name="xuat_xu"
                  placeholder="Xuất xứ: Thái lan"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-gray-700 mb-1">
                  Năm sản xuất
                </label>
                <input
                  type="text"
                  name="nam_sx"
                  placeholder="Năm sản xuất: 2025; 3025"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Hoa lốp
              </label>
              <input
                type="text"
                name="hoa_lop"
                placeholder="Hoa lốp - gai lốp"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold text-gray-700 mb-1">
                  Ngày tạo
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-gray-700 mb-1">
                  Ngày cập nhật
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className=" flex gap-5">
              <div className=" w-1/2">
                <label className="block font-semibold text-gray-700 mb-1">
                  Giá nhập
                </label>
                <input
                  type="number"
                  name="gia_nhap"
                  placeholder="Giá nhập"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-gray-700 mb-1">
                  Giá bán
                </label>
                <input
                  type="number"
                  name="gia_ban"
                  placeholder="Có thể để trống"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mô tả chi tiết */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Mô tả chi tiết
          </label>
          <TextEditor value={description} onChange={setDescription} />
        </div>

        {/* Ảnh */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Thêm Ảnh
          </label>
          <button
            type="button"
            onClick={insertImages}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            + Thêm ảnh
          </button>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-5">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg shadow-sm overflow-hidden group"
                >
                  <img
                    src={url}
                    alt={`Ảnh ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    title="Xóa ảnh"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ảnh đại diện */}
        <div className="mb-6">
          <AnhDaiDienPopup imageUrls={imageUrls} onSelect={setAnhDaiDien} />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition"
        >
          Thêm sản phẩm
        </button>
      </form>
    </>
  );
}
