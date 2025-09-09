"use client";
import { TextField, Autocomplete } from "@mui/material";
import {  useState } from "react";
const optionsSize1 = [
  "40AH",
  "45AH",
  "50AH",
  "55AH",
  "60AH",
  "65AH",
  "70AH",
  "75AH",
  "80AH",
  "90AH",
  "100AH",
];
const optionsSize2 = [
  "AtlasBX",
  "GS",
  "DongNai",
  "Rocket",
  "Enimac",
  "Amaron",
  "Varta",
];

export default function SeachBattery({ onSubmit }:{ onSubmit: (data: any) => void }) {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const handleSubmit = () => {
    onSubmit({ 
      dung_luong: value1,
      thuong_hieu: value2,
      cancel: "NO"
    });
  };
  const handleSubmit_cancel = () => {
    setValue1(null);
    setValue2(null);
    onSubmit({ 
      cancel: "YES"
    });
  };
  return (
    <>
      <div className="flex flex-col p-1 gap-5  ">
        <span className=" flex items-center justify-center"></span>
        <Autocomplete
          options={optionsSize1} 
          value={value1} 
          onChange={(event, newValue) => setValue1(newValue)} 
          renderInput={(params) => (
            <TextField {...params} label="Dung lượng" variant="outlined" />
          )}
          size="small"
        />
        <Autocomplete
          options={optionsSize2} 
          value={value2} 
          onChange={(event, newValue3) => setValue2(newValue3)} 
          renderInput={(params) => (
            <TextField {...params} label="Hãng" variant="outlined" />
          )}
          size="small"
        />
      </div>
      <div className="flex gap-1 ">
        <button onClick={handleSubmit_cancel} className="bg-rose-700 w-1/2  font-bold p-2 items-center  rounded-lg">
          Xóa lọc
        </button>
        <button onClick={handleSubmit} className="bg-rose-700 w-1/2  font-bold p-2 items-center  rounded-lg">
          Tìm kiếm
        </button>
      </div>
    </>
  );
}
