"use client";

import React, { useState } from "react";
export default function ArrangeFiter() {
  const [sortType, setSortType] = useState("price-asc");

  return (
    <div className=" flex  m-3">
      <h3 className="text-black mx-auto ">Sắp xếp theo: </h3>
      <select onChange={(e) => setSortType(e.target.value)} value={sortType} className=" mx-auto text-black rounded-lg">
        <option value="price-asc">Giá thấp → cao</option>
        <option value="price-desc">Giá cao → thấp</option>
        <option value="date-newest">Mới nhất</option>
        <option value="date-oldest">Cũ nhất</option>
      </select>
     
    </div>
  );
}
