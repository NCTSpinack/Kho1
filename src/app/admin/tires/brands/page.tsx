"use client";
import { useEffect, useState } from "react";

interface ThuongHieu {
  id: number;
  ten_thuong_hieu: string;
}

export default function ThuongHieuPage() {
  const [data, setData] = useState<ThuongHieu[]>([]);
  const [newBrand, setNewBrand] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Load dữ liệu
  const fetchData = async () => {
    const res = await fetch("/api/brands");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Thêm mới
  const handleAdd = async () => {
    if (!newBrand) return;
    await fetch("/api/brands", {
      method: "POST",
      body: JSON.stringify({ ten_thuong_hieu: newBrand }),
    });
    setNewBrand("");
    fetchData();
  };

  // Cập nhật
  const handleUpdate = async (id: number) => {
    await fetch(`/api/brands/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ten_thuong_hieu: editValue }),
    });
    setEditId(null);
    setEditValue("");
    fetchData();
  };

  // Xóa
  const handleDelete = async (id: number) => {
    await fetch(`/api/brands/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="p-5">
      <h1 className="font-semibold text-blue-400 text-xl mb-3">
        Quản lý thương hiệu
      </h1>
      <hr className="border-1 border-gray-400 mb-4 w-64" />

      {/* Form thêm mới */}
      <div className="flex gap-2 mb-5">
        <input
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="Nhập tên thương hiệu"
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Danh sách */}
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tên thương hiệu</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                {editId === item.id ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  item.ten_thuong_hieu
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editId === item.id ? (
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditValue(item.ten_thuong_hieu);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Sửa
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
