import axios from "axios";
import { ListOrdered, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
const Homepage = () => {
  return (
    <>
      <Header />
      <FixedBar />
      <ProductList />
    </>
  );
};

function Header() {
  const { handleGoToLogin } = useAppNavigation();
  return (
    // 1. Thẻ <header> dùng 'flex justify-between' để đẩy 2 phần tử con ra 2 phía
    <header className="px-5 py-1 flex justify-between items-center shadow-md bg-bg-header">
      {/* 2. Logo (Bên trái) */}
      <div className="flex items-center">
        <img
          src="/assets/logo.png"
          alt="DuyGuitar Logo"
          className="h-10 w-40 object-cover"
        />
      </div>

      {/* 3. Nhóm các nút (Bên phải) */}
      {/* Dùng 'flex' để các nút xếp hàng ngang */}
      <div className="flex items-center gap-4">
        {/* Đơn hàng (Cạnh giỏ hàng) */}
        <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 text-list-item hover:text-list-item-hovered transition">
          <ListOrdered className="w-5 h-5 mr-1" /> {/* Thêm mr-1 cho đẹp hơn */}
          <span>Đơn hàng</span>
        </button>

        {/* Giỏ hàng (Cạnh đăng nhập) */}
        <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 text-list-item hover:text-list-item-hovered transition">
          <ShoppingCart className="w-5 h-5 mr-1" />
          <span>Giỏ hàng</span>
        </button>

        {/* Đăng nhập (Ngoài cùng bên phải) */}
        <button
          onClick={() => {
            handleGoToLogin();
          }}
          className="px-4 py-1 rounded bg-button-hover text-white hover:bg-button-hovered transition"
        >
          Đăng nhập
        </button>
      </div>
    </header>
  );
}
const FixedBar = () => {
  return <div>Fixed Bar</div>;
};

const ProductList = () => {
  type SanPham = {
    ma_san_pham: string;
    ten_san_pham: string;
    hang_san_xuat: string;
    nam_san_xuat: number;
    gia_san_pham: number;
    mo_ta_san_pham: string;
  };

  const [dataSp, setDataSp] = useState<SanPham[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (keyword = "") => {
    setLoading(true);
    try {
      console.log("Từ khóa:", keyword);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/sanpham/search",
        {
          params: { keyword: keyword.trim() },
        }
      );
      setDataSp(response.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sanpham")
      .then((res) => res.json())
      .then((data) => setDataSp(data))
      .catch((err) => console.error("Lỗi fetch API:", err));
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Nhập mã hoặc tên sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => fetchData(keyword)}>Tìm kiếm</button>

        {loading && <p>Đang tải...</p>}

        {dataSp.length > 0 ? (
          dataSp.map((sanpham, index) => (
            <div key={index}>
              <h3>{sanpham.ten_san_pham}</h3>
              <p>Hãng: {sanpham.hang_san_xuat}</p>
              <p>Năm: {sanpham.nam_san_xuat}</p>
              <p>Giá: {sanpham.gia_san_pham}₫</p>
              <p>Mô tả: {sanpham.mo_ta_san_pham}</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
