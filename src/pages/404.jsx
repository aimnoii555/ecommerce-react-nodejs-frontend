// src/pages/NotFound.jsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <img
        src="https://i.imgflip.com/265k.jpg" 
        alt="Confused Travolta"
        className="w-80 mb-6 rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Not Found 🚫</h1>
      <p className="mb-4 text-lg text-gray-300">
        หน้าเว็บที่คุณพยายามเข้าถึงมันไม่มีจริง... เหมือนแฟนเก่าคุณอะ 😢
      </p>
      <Link
        to="/"
        className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg shadow"
      >
        🏠 กลับบ้านเถอะ
      </Link>
    </div>
  );
};

export default NotFound;
