"use client";
import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

const options = [
  "Toàn bộ",
  "Lốp mới",
  "Lốp thanh lý",
  "Lốp lướt"
];

export default function AutoCompleteTireType() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="w-44 m-2 ">
        <Autocomplete
        options={options} // Danh sách gợi ý
        value={value} // Giá trị đã chọn
        onChange={(event, newValue) => setValue(newValue)} // Cập nhật giá trị
        renderInput={(params) => (
          <TextField {...params} label="Chọn loại lốp"  variant="outlined"  />
        )}
        size="small" 
        
        
      />
    </div>
  );
}
