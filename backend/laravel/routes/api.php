<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SanphamController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/sanpham/search', [SanphamController::class, 'search']);
Route::get('/sanpham', [SanphamController::class, 'index']);
Route::post('/register', [AuthController::class, 'registerCus']);
Route::post('/login', [AuthController::class, 'loginCus']);
Route::post('/login/admin', [AuthController::class, 'loginAdmin']);
