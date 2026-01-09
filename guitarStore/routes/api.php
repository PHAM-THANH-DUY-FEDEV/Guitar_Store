<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;

// Khi có yêu cầu GET đến /api/products, nó sẽ gọi hàm index trong ProductController
Route::get('/products', [ProductController::class, 'index']);
