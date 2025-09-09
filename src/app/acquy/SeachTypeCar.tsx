"use client";
import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
const optionsCarBrand = [
  "Hyundai",
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "Mitsubishi",
  "Subaru",
  "Volkswagen",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Ford",
  "Chevrolet",
  "Tesla",
  "Jeep",
  "Dodge",
  "Kia",
  "Maserati",
  "Rolls-Royce",
  "Bentley",
  "Jaguar",
  "Land Rover",
  "Peugeot",
  "VinFast",
];
const optionsCarName = [
  "Grand i10",
  "Alphard",
  "Rush",
  "Wigo",
  "Avanza",
  "Land Cruiser Prado",
  "Hiace",
  "Granvia",
  "Trailblazer",
  "Colorado",
  "CX-5",
  "CX-8",
  "Mazda 3",
  "Mazda 6",
  "Kia Morning",
  "Kia Seltos",
  "Kia Sorento",
  "Kia Carnival",
  "Kia K3",
  "Kia K5",
  "Kia Sonet",
  "Mitsubishi Xpander",
  "Mitsubishi Outlander",
  "Mitsubishi Pajero Sport",
  "Nissan Navara",
  "Nissan Terra",
  "Subaru Forester",
  "Subaru Outback",
  "Mercedes-Benz C-Class",
  "Mercedes-Benz E-Class",
  "Mercedes-Benz GLC",
  "BMW 3 Series",
  "BMW 5 Series",
  "BMW X5",
  "Audi A4",
  "Audi Q5",
  "Lexus RX",
  "Lexus NX",
];
const optionsCarLife = [
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];
export default function SeachTypeCar({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>(null);
  const [value3, setValue3] = useState<string | null>(null);
  const handleSubmit = () => {
    onSubmit({
      hang_xe: value1,
      ten_xe: value2,
      doi_xe: value3,
      cancel: "NO",
      flag: "true"
    });
  };
  const CancelSeachs = () => {
    onSubmit({
      cancel: "YES",
    });
    setValue1(null);
    setValue2(null);
    setValue3(null)
  };

  return (
    <>
      <div className="flex flex-col p-1 gap-5  ">
        <Autocomplete
          options={optionsCarBrand} // Danh sách gợi ý
          value={value1} // Giá trị đã chọn
          onChange={(event, newValue) => setValue1(newValue)} // Cập nhật giá trị
          renderInput={(params) => (
            <TextField {...params} label="Hãng xe" variant="outlined" />
          )}
          size="small"
        />
        <Autocomplete
          options={optionsCarName} // Danh sách gợi ý
          value={value2} // Giá trị đã chọn
          onChange={(event, newValue3) => setValue2(newValue3)} // Cập nhật giá trị
          renderInput={(params) => (
            <TextField {...params} label="Tên xe" variant="outlined" />
          )}
          size="small"
        />
        <Autocomplete
          options={optionsCarLife} // Danh sách gợi ý
          value={value3} // Giá trị đã chọn
          onChange={(event, newValue3) => setValue3(newValue3)} // Cập nhật giá trị
          renderInput={(params) => (
            <TextField {...params} label="Đời xe" variant="outlined" />
          )}
          size="small"
        />
      </div>
      <div className="flex gap-1 ">
        <button
          onClick={CancelSeachs}
          className="bg-rose-700 w-1/2  font-bold p-2 items-center  rounded-lg"
        >
          Xóa bỏ
        </button>
        <button
          onClick={handleSubmit}
          className="bg-rose-700 w-1/2  font-bold p-2 items-center  rounded-lg"
        >
          Tìm kiếm
        </button>
      </div>
    </>
  );
}
