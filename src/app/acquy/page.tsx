"use client";
import { useEffect, useState } from "react";
import ArrangeFiter from "./arrangefilter";
import Image from "next/image";
import SetActiveForm from "./setActiveForm";
import Link from "next/link";


export default function Acquy() {
  // Danh sách sản phẩm đầy đủ

  const categories = [
    { name: "All Products", count: 1 },
    { name: "Brakes", count: 5 },
    { name: "Electrical", count: 5 },
    { name: "Engine", count: 5 },
    { name: "Heating and Cooling", count: 5 },
    { name: "Steering", count: 4 },
    { name: "Suspension", count: 5 },
  ];
  const CategoriesDMSP = [
    { name: "Lốp ô tô thanh lý" },
    { name: "Lốp ô tô mới" },
    { name: "Lốp ô tô cũ" },
    { name: "Bình ắc quy " },
    { name: "Cần gạt mưa" },
    { name: "Nước làm mát" },
    { name: "Dây câu bình" },
    { name: "Van cảm biến" },
    { name: "Van cao su" },
    { name: "Vành độ" },
    { name: "Sạc không dây" },
    { name: "Bơm lốp Michelin" },
  ];

  const productsPerPage = 10; // Số sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [originalProduct, setOriginalProduct] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/acquy");
        const data = await res.json();
        setProducts(data);
        setOriginalProduct(data); // Lưu bản gốc
      } catch (error) {
        console.log("Loi tai san pham", error);
      }
    };
    fetchProducts();
  }, []);

  console.log("product:", products);
  // Tính toán sản phẩm của trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // xử lý tìm kiếm
  const handleSearchData = async (data: any) => {
    console.log("Dữ liệu tìm kiếm:", data);
    if (data.cancel == "YES") {
      console.log("old", originalProduct);
      setProducts(originalProduct);
    } else {
      if (data.flag == "true") {
        if (!data.hang_xe || !data.ten_xe || !data.doi_xe) {
          alert("hãng xe, tên xe, đời xe không được để trống!");
          return 0;
        } else {
          // Gọi API hoặc cập nhật UI dựa trên dữ liệu tìm kiếm
          const res = await fetch("/api/products/acquy/timkiem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const result = await res.json();

          console.log("resul of type:", result.data);
           setProducts(result.data);
        }
      } else {
        // Gọi API hoặc cập nhật UI dựa trên dữ liệu tìm kiếm
        const res = await fetch("/api/products/acquy/timkiem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log("resul:", result.data);
        setProducts(result.data);
      }
    }
  };
  return (
    <>
      <div className="w-11/12  mx-auto h-auto rounded-lg container flex mb-5 gap-2">
        {/* Sidebar */}
        <SetActiveForm onSearch={handleSearchData} />

        {/* Nội dung chính */}
        <div className="flex flex-col gap-6 flex-1 mt-5 mb-5  font-medium rounded-r-lg">
          <div className="h-14 flex border-1 border-gray-200 rounded-lg">
            <div className="w-3/4 flex gap-5 ml-5">
              
            </div>
            <div className="w-1/4 ml-5">
              <ArrangeFiter />
            </div>
          </div>
          <div className=" h-auto border-1 border-gray-200 rounded-lg">
            <div className="container mx-auto p-4">
              <h2 className="text-2xl  font-semibold mb-7 text-center ">
                DANH SÁCH SẢN PHẨM
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentProducts.map((p) => (
                  <div
                    key={p.id}
                    className="h-auto flex flex-col justify-between bg-white p-4 rounded-lg shadow-md border border-gray-300 transition duration-300 hover:border-rose-700 hover:scale-97"
                  >
                    <Link href={`/acquy/${p.slug}`}>
                      <div className="relative ">
                        <span className="absolute  bg-red-500 text-white text-xs px-2 py-1 rounded ">
                        Hàng mới
                      </span>
                        <Image
                          src={p.anh_dai_dien}
                          alt={p.ten_san_pham}
                          width={500}
                          height={500}
                          className="w-full h-auto rounded object-cover"
                          priority
                        />
                      </div>
                      <div className="mt-3">
                        <p className="text-yellow-500 text-sm font-semibold">
                          ⭐ {p.rating} / 5
                        </p>
                        <h3 className="text-sm font-semibold">
                          {p.ten_san_pham}
                        </h3>
                        {/* <p className="text-sm text-gray-500 line-through">
                        {product.oldPrice}
                      </p> */}
                        {/* <p className="text-lg text-red-500 font-semibold">
                        {product.price}
                      </p> */}
                        <p className="text-sm text-green-600 font-semibold">
                          {p.trang_thai ? "Còn hàng" : "Hết hàng"}
                        </p>
                        <button className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300">
                          Xem ngay
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-wrap justify-center mt-6 gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-gray-500 text-white rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Trang trước
                </button>

                <span className="text-lg font-semibold">
                  Trang {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-gray-500 text-white rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Trang sau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
