'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const [openTires, setOpenTires] = useState(false);
  const [openOils, setOpenOils] = useState(false);
  const [openBatteries, setOpenBatteries] = useState(false);
  const [openParts, setOpenParts] = useState(false);

  return (
    <aside className="w-64 h-screen bg-blue-50 text-gray-950 shadow-lg p-6 flex flex-col space-y-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center">Admin Panel</h2>

      <nav className="flex-1 space-y-6 text-sm">
        <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">
          🧭 Dashboard
        </Link>

        {/* --- SẢN PHẨM --- */}
        <div className="space-y-2">
          <h3 className="uppercase text-gray-400 text-xs px-4">Sản phẩm</h3>

          {/* --- LỐP --- */}
          <div className="px-2">
            <button
              onClick={() => setOpenTires(!openTires)}
              className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-amber-300 transition"
            >
              <span className="font-semibold text-blue-500">Lốp</span>
              {openTires ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openTires && (
              <ul className="pl-5 mt-1 space-y-1 border-l border-gray-700 text-sm text-gray-950">
                <li><Link href="/admin/tires" className="block py-1 hover:text-blue-500">• Tất cả sản phẩm</Link></li>
                <li><Link href="/admin/tires/new" className="block py-1 hover:text-blue-400">• Thêm sản phẩm mới</Link></li>
                <li><Link href="/admin/tires/brands" className="block py-1 hover:text-blue-400">• Thương Hiệu </Link></li>
                <li><Link href="/admin/tires/sizes" className="block py-1 hover:text-blue-400">• Kích thước</Link></li>
                <li><Link href="/admin/tires/types" className="block py-1 hover:text-blue-400">• Loại lốp</Link></li>
                <li><Link href="/admin/tires/years" className="block py-1 hover:text-blue-400">• Đời xe</Link></li>
              </ul>
            )}
          </div>

          {/* --- DẦU --- */}
          <div className="px-2">
            <button
              onClick={() => setOpenOils(!openOils)}
              className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-blue-500 transition"
            >
              <span className="font-semibold text-yellow-400">Dầu</span>
              {openOils ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openOils && (
              <ul className="pl-5 mt-1 space-y-1 border-l border-gray-700 text-sm text-gray-300">
                <li><Link href="/admin/oils" className="block py-1 hover:text-white">• Tất cả sản phẩm</Link></li>
              </ul>
            )}
          </div>

          {/* --- ẮC QUY --- */}
          <div className="px-2">
            <button
              onClick={() => setOpenBatteries(!openBatteries)}
              className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              <span className="font-semibold text-pink-400">Ắc Quy</span>
              {openBatteries ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openBatteries && (
              <ul className="pl-5 mt-1 space-y-1 border-l border-gray-700 text-sm text-gray-300">
                <li><Link href="/admin/batteries" className="block py-1 hover:text-white">• Tất cả sản phẩm</Link></li>
              </ul>
            )}
          </div>

          {/* --- PHỤ TÙNG - PHỤ KIỆN --- */}
          <div className="px-2">
            <button
              onClick={() => setOpenParts(!openParts)}
              className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              <span className="font-semibold text-green-400">Phụ tùng - Phụ kiện</span>
              {openParts ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openParts && (
              <ul className="pl-5 mt-1 space-y-1 border-l border-gray-700 text-sm text-gray-300">
                <li><Link href="/admin/parts" className="block py-1 hover:text-white">• Tất cả sản phẩm</Link></li>
              </ul>
            )}
          </div>
        </div>

        {/* --- ĐƠN HÀNG --- */}
        <Link href="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-800">
          📦 Đơn hàng
        </Link>
      </nav>

      <div className="text-xs text-gray-500 text-center">
        © 2025 MyAuto Admin
      </div>
    </aside>
  );
}
