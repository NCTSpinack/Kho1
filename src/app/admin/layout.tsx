// app/admin/layout.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import Header from "../component/header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-11/12 h-10 mx-auto rounded-lg flex m-2 bg-blue-100 text-gray-900 "> đây là cc</div>
      <div className="w-11/12 mx-auto h-auto rounded-lg container flex mb-5 gap-2">
        {/* Sidebar bên trái */}
        <Sidebar/>
        {/* Nội dung bên phải */}
        <main className="flex-1 p-6 font-semibold bg-blue-50 text-gray-900 overflow-y-auto rounded-lg">
          {children}
        </main>
      </div>
    </>
  );
}
