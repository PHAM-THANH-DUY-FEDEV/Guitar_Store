// import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppNavigation } from "../hooks/useAppNavigation";
import axios from "axios";

interface LoginFormInputs {
  ten_dang_nhap: string;
  mat_khau: string;
}

type checkTypeLogin = {
  admin?: number;
};

const LoginPage: React.FC<checkTypeLogin> = ({ admin }) => {
  const { handleGoToRegister, handleGoToHome, handleGoToAdminPage } =
    useAppNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Dữ liệu đăng nhập:", data);
    try {
      const res = await axios.post(
        `${
          admin == 0
            ? "http://127.0.0.1:8000/api/login"
            : "http://127.0.0.1:8000/api/login/admin"
        }`,
        data,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("Đăng nhập thành công:", res.data);
      alert("Đăng nhập thành công!");
      axios.defaults.headers.common["Authorization"] =
        "Bearer" + res.data.token;
      localStorage.setItem(
        admin == 0 ? "JWT" : "JWTAdmin",
        JSON.stringify(res.data)
      );
      admin == 0 ? handleGoToHome() : handleGoToAdminPage();
    } catch (err: any) {
      if (err.response) {
        console.error("Lỗi server:", err.response.data);
        alert(err.response.data.message || "Đăng nhập thất bại!");
      } else {
        alert("Không thể kết nối server!");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-[url('/assets/banner1.jpg')] flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-black/30" />
      <div className="flex flex-col gap-5 z-20 w-[400px] text-white pr-10">
        <h1 className=" w-[380px] mr-20 text-[60px]">Duy Guitar</h1>
        <p className="border-b-2 border-t-2 border-white text-[20px]">
          Tôi thấy cậu quen quá chúng ta đã gặp nhau chưa nhỉ, đăng nhập để Duy
          Guitar có thể nhận ra bạn nào khách hàng đáng kính.
        </p>
        <div className="w-[360px] min-w-[200px] items-top">
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
      <div className="bg-white backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-duyguitar-dark mb-6">
          {admin == 0 ? "Đăng nhập" : "Đăng nhập admin"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="ten_dang_nhap"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên đăng nhập:
            </label>
            <input
              id="ten_dang_nhap"
              type="text"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
              {...register("ten_dang_nhap", {
                required: "Tên đăng nhập là bắt buộc",
              })}
            />
            {errors.ten_dang_nhap && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ten_dang_nhap?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mật khẩu:
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
              {...register("mat_khau", { required: "Mật khẩu là bắt buộc" })}
            />
            {errors.mat_khau && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mat_khau?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-button-hover text-white font-semibold rounded-md shadow-sm 
                       hover:bg-button-hovered transition-colors focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-duyguitar-blue"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => {
              handleGoToRegister();
            }}
            className="font-medium text-duyguitar-blue hover:underline focus:outline-none"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
