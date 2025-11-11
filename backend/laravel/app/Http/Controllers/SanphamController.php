<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sanpham;
use Illuminate\Http\Request;

class SanphamController extends Controller
{
    public function index()
    {
        return response()->json(Sanpham::all());
    }

    public function show($id)
    {
        $product = Sanpham::find($id);
        if (!$product) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm'], 404);
        }
        return response()->json($product);
    }

    public function search(Request $request)
{
    $keyword = $request->query('keyword');
    \Log::info('Từ khóa tìm kiếm:', ['keyword' => $keyword]);

    $results = Sanpham::where('ten_san_pham', 'LIKE', "%{$keyword}%")
        ->orWhere('ma_san_pham', 'LIKE', "%{$keyword}%")
        ->get();

    \Log::info('Kết quả tìm kiếm:', ['count' => $results->count()]);

    if ($results->isEmpty()) {
        return response()->json(['message' => 'Không tìm thấy sản phẩm']);
    }

    return response()->json($results);
}
}
