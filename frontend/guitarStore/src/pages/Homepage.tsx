/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { ListOrdered, ShoppingCart } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import BannerSlider from "../components/BannerSlider";
const Homepage = () => {
  const banners = [
    "/assets/banner1.jpg",
    "/assets/banner2.jpg",
    "/assets/banner3.jpg",
  ];

  return (
    <HomepageProvider>
      <div className="shadow-md bg-header">
        <Header />
        <FixedBar />
      </div>
      <div className="max-w-[1480px] mx-auto h-full">
        <BannerSlider images={banners} />
        <ProductList />
      </div>
      <div className="shadow-md bg-header">
        <Footer />
      </div>
    </HomepageProvider>
  );
};
type SanPham = {
  ma_san_pham: string;
  ten_san_pham: string;
  hang_san_xuat: string;
  nam_san_xuat: number;
  gia_san_pham: number;
  mo_ta_san_pham: string;
};

type HomepageContextType = {
  sanPhamList: SanPham[];
  setSanPhamList: React.Dispatch<React.SetStateAction<SanPham[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
};
const HomepageContext = createContext<HomepageContextType | undefined>(
  undefined
);

export const HomepageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sanPhamList, setSanPhamList] = useState<SanPham[]>([]);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <HomepageContext.Provider
      value={{
        sanPhamList,
        setSanPhamList,
        loading,
        setLoading,
        hover,
        setHover,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
};

export const useSanPham = () => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error("useSanPham must be used within a SanPhamProvider");
  }
  return context;
};

export const useHover = () => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error("lỗi khi tạo useHover");
  }
  return context;
};

function Header() {
  const { handleGoToLogin } = useAppNavigation();
  return (
    <header className="flex justify-between items-center px-6 py-3  md:max-w-[1480px] mx-auto bg-bg-header">
      <div className="flex items-center">
        <img
          src="/assets/logo_2.png"
          alt="DuyGuitar Logo"
          className="h-12 w-40 object-cover shadow-xl rounded-md py-1"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-200 text-white hover:text-list-item-hovered transition ">
          <ListOrdered className="w-5 h-5 mr-1" /> {/* Thêm mr-1 cho đẹp hơn */}
          <span>Đơn hàng</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-200 text-white hover:text-list-item-hovered transition">
          <ShoppingCart className="w-5 h-5 mr-1" />
          <span>Giỏ hàng</span>
        </button>

        <button
          onClick={() => {
            handleGoToLogin();
          }}
          className="px-4 py-1 rounded bg-button-hover text-white hover:text-list-item-hovered hover:bg-gray-200 transition"
        >
          Đăng nhập
        </button>
      </div>
    </header>
  );
}
const FixedBar = () => {
  const [keyword, setKeyword] = useState("");
  const { setSanPhamList, setLoading } = useSanPham();
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
      setSanPhamList(response.data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
    setLoading(false);
  };
  return (
    <div className="px-6 py-2 top-0 left-0 flex md:max-w-[1480px] mx-auto ">
      {" "}
      <div className="w-[50%]">
        <input
          className="w-[80%] p-2 bg-white border-white m-1 rounded-md outline-0"
          type="text"
          placeholder="Nhập mã hoặc tên sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="p-2 bg-button-hover rounded-md hover:bg-button-hovered text-white hover:text-list-item-hovered hover:bg-gray-200 transition"
          onClick={() => fetchData(keyword)}
        >
          Tìm kiếm
        </button>
      </div>
      <div className="w-[50%] m-1 dropdown-fixed-bar flex justify-between">
        {/* <DropdownFixedBar
          title="Thương hiệu"
          options={["Yamaha", "Fender", "Taylor"]}
          onSelect={(value) => console.log("Chọn:", value)}
        /> */}
        <DropdownFixedBar
          title="Thương hiệu"
          options={["Morris", "Guitar Trần", "Yamaha"]}
          onSelect={(index) => {
            console.log("Đã chọn option:", index);
          }}
        ></DropdownFixedBar>
        <DropdownFixedBar
          title="Thương hiệu"
          options={["Morris", "Guitar Trần", "Yamaha"]}
          onSelect={(index) => {
            console.log("Đã chọn option:", index);
          }}
        ></DropdownFixedBar>{" "}
        <DropdownFixedBar
          title="Thương hiệu"
          options={["Morris", "Guitar Trần", "Yamaha"]}
          onSelect={(index) => {
            console.log("Đã chọn option:", index);
          }}
        ></DropdownFixedBar>
      </div>
    </div>
  );
};

type DropdownMenuProps = {
  title: string;
  options: string[];
  onSelect?: (value: number) => void;
};

const DropdownFixedBar: React.FC<DropdownMenuProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [select, setSelected] = useState(0);
  const handleSelectFC = (index: number) => {
    setSelected(index);
    onSelect?.(index);
    setOpen(false);
  };

  return (
    <div
      className="w-[30%]"
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <div aria-label="dropdown " className="relative text-sm font-medium ">
        <div className="flex items-center justify-between w-full p-2 border rounded cursor-pointer text-white">
          <span className="pointer-events-none">{title}</span>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
        {open ? (
          <div className="absolute left-0 w-full p-1 bg-white rounded-lg shadow top-full z-20">
            {/* Thay Array bằng mảng các lựa chọn trong dropdown */}
            {options.map((item, index) => (
              <div
                className="p-3 rounded cursor-pointer hover:bg-gray-200 text-list-item hover:text-list-item-hovered "
                key={index}
                onClick={() => {
                  handleSelectFC(index);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const ProductList = () => {
  const { sanPhamList, setSanPhamList, loading } = useSanPham();
  const { hover, setHover } = useHover();
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sanpham")
      .then((res) => res.json())
      .then((data) => setSanPhamList(data))
      .catch((err) => console.error("Lỗi fetch API:", err));
  }, []);

  const pricestyle: React.CSSProperties = {
    opacity: hover ? 1 : 0,
    transition: "all 1s ease",
  };

  return (
    <>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
        {loading && <p>Đang tải...</p>}
        {/* {sanPhamList.length > 0 ? (
          sanPhamList.map((sanpham, index) => (
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
        )} */}
        {/* Test giao diện */}
        <div
          className="mx-auto w-64 rounded-3xl bg-linear-to-b from-[#ccc] to-gray-600 p-4 relative overflow-hidden shadow-xl"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="absolute top-4 right-4 bg-gray-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider backdrop-blur-md">
            Tokyo Gakki EXPO 2025 Limited Edition
          </div>
          {/* Ảnh sản phẩm */}
          <div className="mt-10 mb-6 flex justify-center">
            <img
              src="/assets/test-image-sp.png"
              alt="watch"
              className="w-60 h-60 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Text bên dưới */}
          <div className="text-left text-white/80 text-xs tracking-wide">
            <div className="mb-1">FE-93</div>
            <div className="text-[11px] text-white/60">HAND MADE PREMIUM</div>
            <div
              className="mb-1 transition-opacity duration-1000"
              style={pricestyle}
            >
              5.000.000đ
            </div>
          </div>
        </div>
        <div
          className="mx-auto w-64 rounded-3xl bg-linear-to-b from-[#ccc] to-gray-600 p-4 relative overflow-hidden shadow-xl"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="absolute top-4 right-4 bg-gray-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider backdrop-blur-md">
            Tokyo Gakki EXPO 2025 Limited Edition
          </div>
          {/* Ảnh sản phẩm */}
          <div className="mt-10 mb-6 flex justify-center">
            <img
              src="/assets/test-image-sp.png"
              alt="watch"
              className="w-60 h-60 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Text bên dưới */}
          <div className="text-left text-white/80 text-xs tracking-wide">
            <div className="mb-1">FE-93</div>
            <div className="text-[11px] text-white/60">HAND MADE PREMIUM</div>
            {hover == true ? <div className="mb-1">5.000.000đ</div> : ""}
          </div>
        </div>
        <div
          className="mx-auto w-64 rounded-3xl bg-linear-to-b from-[#ccc] to-gray-600 p-4 relative overflow-hidden shadow-xl"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="absolute top-4 right-4 bg-gray-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider backdrop-blur-md">
            Tokyo Gakki EXPO 2025 Limited Edition
          </div>
          {/* Ảnh sản phẩm */}
          <div className="mt-10 mb-6 flex justify-center">
            <img
              src="/assets/test-image-sp.png"
              alt="watch"
              className="w-60 h-60 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Text bên dưới */}
          <div className="text-left text-white/80 text-xs tracking-wide">
            <div className="mb-1">FE-93</div>
            <div className="text-[11px] text-white/60">HAND MADE PREMIUM</div>
            {hover == true ? <div className="mb-1">5.000.000đ</div> : ""}
          </div>
        </div>{" "}
        <div
          className="mx-auto w-64 rounded-3xl bg-linear-to-b from-[#ccc] to-gray-600 p-4 relative overflow-hidden shadow-xl"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="absolute top-4 right-4 bg-gray-600 text-white text-[10px] px-3 py-1 rounded-full tracking-wider backdrop-blur-md">
            Tokyo Gakki EXPO 2025 Limited Edition
          </div>
          {/* Ảnh sản phẩm */}
          <div className="mt-10 mb-6 flex justify-center">
            <img
              src="/assets/test-image-sp.png"
              alt="watch"
              className="w-60 h-60 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Text bên dưới */}
          <div className="text-left text-white/80 text-xs tracking-wide">
            <div className="mb-1">FE-93</div>
            <div className="text-[11px] text-white/60">HAND MADE PREMIUM</div>
            {hover == true ? <div className="mb-1">5.000.000đ</div> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div className="p-6 flex gap-20 bg-item-list h-[300px] text-white bg-footer md:max-w-[1480px] mx-auto ">
        <div className="min-w-60 ">
          <h3 className="font-bold mb-4 text-lg border-b border-white mx-2">
            Hướng dẫn chung
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-gray-400  hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Giao hàng - Đổi hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Hướng dẫn mua hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Thanh toán - Bảo mật
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo hành
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo trì
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Kích hoạt bảo hành
              </span>
            </li>
          </ul>
        </div>
        <div className="min-w-60 ">
          <h3 className="font-bold mb-4 text-lg border-b border-white mx-2">
            Hướng dẫn chung
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-gray-400  hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Giao hàng - Đổi hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Hướng dẫn mua hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Thanh toán - Bảo mật
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo hành
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo trì
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Kích hoạt bảo hành
              </span>
            </li>
          </ul>
        </div>
        <div className="min-w-60 ">
          <h3 className="font-bold mb-4 text-lg border-b border-white mx-2">
            Hướng dẫn chung
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-2 text-gray-400  hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Giao hàng - Đổi hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Hướng dẫn mua hàng
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Thanh toán - Bảo mật
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo hành
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Chính sách bảo trì
              </span>
            </li>
            <li className="mb-2 text-gray-400 hover:text-white cursor-pointer">
              <span className="flex items-center">
                <span className="material-symbols-outlined">chevron_right</span>
                Kích hoạt bảo hành
              </span>
            </li>
          </ul>
        </div>
        <div className="w-[400px] min-w-[200px] items-top">
          <img
            src="/assets/logo_2.png"
            alt="DuyGuitar Logo"
            className="h-auto max-h-22 w-full object-cover shadow-xl rounded-md py-1"
          />
          <div className="mt-4 flex gap-5">
            <img
              src="/assets/fb_icon.png"
              alt="DuyGuitar Logo"
              className="h-10 cursor-pointer object-cover shadow-xl rounded-md py-1"
            />
            <img
              src="/assets/ytb_icon.png"
              alt="DuyGuitar Logo"
              className="h-10.5 cursor-pointer object-cover shadow-xl rounded-md py-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Homepage;
