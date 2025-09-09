import AddTireForm from "./addTires";
export default function Tire_New() {
  return (
    <div>
      <h1 className="font-semibold text-blue-400 text-xl mb-1">Thêm Mới</h1>
      <hr className="border-1 border-white-500 my-3 w-64 mb-3" />
      <AddTireForm/>
    </div>
  );
}
