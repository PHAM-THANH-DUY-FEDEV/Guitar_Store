<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\KhachHang;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends Controller
{
    public function registerCus(Request $request)
    {

        $messages = [
            'ten_dang_nhap.required' => 'Tên đăng nhập là bắt buộc.',
            'ten_dang_nhap.max' => 'Tên đăng nhập không được vượt quá 50 ký tự.',
            'ten_dang_nhap.unique' => 'Tên đăng nhập này đã tồn tại.',
            
            'email_khach_hang.required' => 'Email là bắt buộc.',
            'email_khach_hang.email' => 'Email không hợp lệ.',
            'email_khach_hang.unique' => 'Email này đã được sử dụng.',
            
            'so_dien_thoai.required' => 'Số điện thoại là bắt buộc.',
            'so_dien_thoai.max' => 'Số điện thoại không được vượt quá 11 số.',
            'so_dien_thoai.unique' => 'Số điện thoại này đã được đăng ký.',
            
            'mat_khau.required' => 'Mật khẩu là bắt buộc.',
            'mat_khau.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'mat_khau.same' => 'Xác nhận mật khẩu không khớp.',
        ];
        // 1. Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
         'ten_dang_nhap' => 'required|string|max:50|unique:KhachHang,ten_dang_nhap',
         'email_khach_hang' => 'required|email|unique:KhachHang,email_khach_hang',
         'so_dien_thoai' => 'required|string|max:11|unique:KhachHang,so_dien_thoai',
         'mat_khau' => 'required|min:6|same:xac_nhan_mat_khau',
        ], $messages);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Tạo tài khoản mới
        $lastCustomer = KhachHang::orderBy('ma_khach_hang', 'desc')->first();
         if ($lastCustomer) {
        // lấy số cuối cùng từ mã cũ, ví dụ KH005 -> 5
         $lastNumber = intval(substr($lastCustomer->ma_khach_hang, 2));
         $newCode = 'KH' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
         } else {
            $newCode = 'KH001';
         }

        $user = KhachHang::create([
        'ma_khach_hang' => $newCode,
        'so_dien_thoai' => $request->so_dien_thoai,
        'email_khach_hang' => $request->email_khach_hang,
        'ten_dang_nhap' => $request->ten_dang_nhap,
        'mat_khau' => Hash::make($request->mat_khau),
        'dia_chi' => $request->dia_chi ?? null,
         ]);

        // 3. Trả về phản hồi JSON
         return response()->json([
        'status' => true,
        'message' => 'Đăng ký thành công!',
        'data' => $user
         ], 201);
    }
    public function loginCus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ten_dang_nhap' => 'required|string|max:50',
            'mat_khau' => 'required|min:6',
        ]);
        if ($validator -> fails()){
         return response()->json([
            'status' => false,
            'errors' => $validator->errors()
         ],422);
        };

        $user = KhachHang::where('ten_dang_nhap', $request->ten_dang_nhap)->first();
        if (! $user || !Hash::check($request->mat_khau,$user->mat_khau)){
         return response()->json([
            'status' => false,
            'errors' => 'tên đăng nhập hoặc mật khẩu không đúng'
         ],401);
        };

        $payload = [
        'sub' => $user->ma_khach_hang,
        'name' => $user->ten_dang_nhap,
        'iat' => time(),
        'exp' => time() + 3600 // 1 tiếng
        ];
        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
        return response()->json([
            'token' => $jwt,
            'user' => $user
        ]);
   }
}
