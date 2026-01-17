import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppNavigation } from "../hooks/useAppNavigation";
import axios from "axios";

interface RegisterFormInput {
  ten_dang_nhap: string;
  so_dien_thoai: string;
  email_khach_hang: string;
  mat_khau: string;
  xac_nhan_mat_khau: string;
  dia_chi: string;
}

const RegisterPage = () => {
  const { handleGoToLogin } = useAppNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();
  const [errorsData, setErrorsData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", data, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Đăng ký thành công:", res.data);
      alert("Đăng ký thành công!");
      handleGoToLogin();
    } catch (err: any) {
      if (err.response) {
        console.error("Lỗi server:", err.response.data);
        setErrorsData(err.response.data.errors);
        console.log(errorsData);
      } else {
        alert("Không thể kết nối server!");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-row bg-[url('/assets/banner1.jpg')] items-center justify-center bg-gray-100 p-4">
      <div className="absolute inset-0 bg-black/60" />
      <div className="flex flex-col gap-5 z-20 w-[400px] text-white pr-10 mb-70">
        <h1 className=" w-[380px] mr-20 text-[60px] ">Duy Guitar</h1>
        <p className="border-b-2 border-t-2 border-white text-[20px]">
          Mỗi cây đàn là một câu chuyện, mỗi hợp âm là một cảm xúc chưa kịp gọi
          tên. Duy Guitar đồng hành cùng bạn trên hành trình chạm đến âm nhạc
          của riêng mình.
        </p>
        <p className="border-b-2 border-white text-[20px]">
          Đăng ký tài khoản để trở thành khách hàng thân thiết của Duy Guitar
          nhé.
        </p>
        <div className="w-360px] min-w-[200px] items-top">
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
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-duyguitar-dark mb-6">
          Đăng ký
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tên đăng nhập:
            </label>
            <input
              id="name"
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
            {errorsData["ten_dang_nhap"] && (
              <p className="mt-1 text-sm text-red-600">
                {Array.isArray(errorsData["ten_dang_nhap"])
                  ? errorsData["ten_dang_nhap"][0]
                  : String(errorsData["ten_dang_nhap"])}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Số điện thoại:
            </label>
            <input
              id="phone"
              type="tel"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
              {...register("so_dien_thoai", {
                required: "Số điện thoại là bắt buộc",
              })}
            />
            {errors.so_dien_thoai && (
              <p className="mt-1 text-sm text-red-600">
                {errors.so_dien_thoai?.message}
              </p>
            )}
            {errorsData["so_dien_thoai"] && (
              <p className="mt-1 text-sm text-red-600">
                {Array.isArray(errorsData["so_dien_thoai"])
                  ? errorsData["so_dien_thoai"][0]
                  : String(errorsData["so_dien_thoai"])}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
              {...register("email_khach_hang", {
                required: "Email là bắt buộc",
              })}
            />
            {errors.email_khach_hang && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email_khach_hang?.message}
              </p>
            )}
            {errorsData["email_khach_hang"] && (
              <p className="mt-1 text-sm text-red-600">
                {Array.isArray(errorsData["email_khach_hang"])
                  ? errorsData["email_khach_hang"][0]
                  : String(errorsData["email_khach_hang"])}
              </p>
            )}
          </div>
          <label
            htmlFor="dia_chi"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ
          </label>
          <textarea
            id="dia_chi"
            rows={3}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
             focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
            {...register("dia_chi", {
              required: "Địa chỉ là bắt buộc",
            })}
          />
          {errors.dia_chi && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dia_chi?.message}
            </p>
          )}
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
            {errorsData["mat_khau"] && (
              <p className="mt-1 text-sm text-red-600">
                {Array.isArray(errorsData["mat_khau"])
                  ? errorsData["mat_khau"][0]
                  : String(errorsData["mat_khau"])}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="repassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Xác nhận lại mật khẩu:
            </label>
            <input
              id="repassword"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-duyguitar-blue focus:border-transparent"
              {...register("xac_nhan_mat_khau", {
                required: "Mật khẩu xác nhận là bắt buộc",
              })}
            />
            {errors.xac_nhan_mat_khau && (
              <p className="mt-1 text-sm text-red-600">
                {errors.xac_nhan_mat_khau?.message}
              </p>
            )}
          </div>
          {isLoading ? (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-button-hover text-white font-semibold rounded-md shadow-sm 
                       hover:bg-button-hovered transition-colors focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-duyguitar-blue flex justify-center"
            >
              <div className="w-7 h-7 border-4 border-gray-300 border-t-blue-300 rounded-full animate-spin"></div>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-button-hover text-white font-semibold rounded-md shadow-sm 
                       hover:bg-button-hovered transition-colors focus:outline-none focus:ring-2 
                       focus:ring-offset  -2 focus:ring-duyguitar-blue "
            >
              Đăng ký
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button
            onClick={() => {
              handleGoToLogin();
            }}
            className="font-medium text-duyguitar-blue hover:underline focus:outline-none"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
