"use client";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import SeachBattery from "./SeachBattery";
import SeachTypeCar from "./SeachTypeCar";
export default function SetActiveForm({ onSearch }: { onSearch: (data: any) => void }) {
  const [activeForm, setActiveForm] = useState<'battery' | 'car'>('battery');
  return (
    <>
      <div className=" hidden md:flex flex-col w-1/5 mt-5 font-semibold ">
        <h2 className="text-xl font-semibold text-center rounded-xl h-11 flex items-center justify-center">
          <FaFilter className=" mr-3" />
          Tìm kiếm Ắc quy
        </h2>
        <hr className="border-1 border-gray-500 my-3" />
        <div className="flex ">
          <button 
            className=" w-1/2 border-r"
            onClick={() => setActiveForm('battery') }
          >Ắc quy</button>

          <button 
            className=" w-1/2 "
            onClick={() => setActiveForm('car')}
          >Theo dòng xe</button>
        </div>
        <div className=" h-80 border-1 border-gray-400 rounded">
          <div className=" flex flex-col text-amber-50 m-2 p-2 gap-2">
            {activeForm === 'battery' && <SeachBattery onSubmit = {onSearch} />}
            {activeForm === 'car' && <SeachTypeCar onSubmit={onSearch} />}
          </div>
        </div>
      </div>
    </>
  );
}
