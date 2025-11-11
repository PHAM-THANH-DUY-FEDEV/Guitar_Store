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
    public function up()
    {
        Schema::create('nhanvien', function (Blueprint $table) {
            $table->string('ma_nhan_vien', 10)->primary();
            $table->string('ma_chuc_vu', 10)->index('ma_chuc_vu');
            $table->string('ten_nhan_vien', 100);
            $table->date('ngay_sinh')->nullable();
            $table->string('cccd', 20)->nullable()->unique('cccd');
            $table->date('ngay_lam_viec')->nullable();
            $table->decimal('luong', 15)->nullable();
            $table->string('noi_cong_tac')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nhanvien');
    }
};
