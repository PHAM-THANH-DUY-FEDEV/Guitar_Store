<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('KhachHang', function (Blueprint $table) {
            $table->string('ma_khach_hang')->primary();
            $table->string('dia_chi');
            $table->string('ten_dang_nhap')->unique();
            $table->string('email_khach_hang')->unique();
            $table->string('so_dien_thoai',11)->unique()->nullable();
            $table->string('mat_khau');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('KhachHang');
    }
};
