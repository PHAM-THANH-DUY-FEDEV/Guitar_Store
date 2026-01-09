// hooks/useAppNavigation.ts
// (Lưu ý: Bạn nên đặt tên file custom hook bắt đầu bằng chữ "use")

import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  // 1. Gọi useNavigate() bên trong custom hook
  const navigate = useNavigate();

  // 2. Định nghĩa các hàm điều hướng của bạn
  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  const handleGotoCart = () => {
    navigate("/cart");
  };
  // 3. Trả về các hàm này
  return {
    handleGoToLogin,
    handleGoToRegister,
    handleGoToHome,
    handleGoBack,
    handleGotoCart,
    // Thêm bất kỳ hàm điều hướng nào khác bạn cần ở đây
  };
};
