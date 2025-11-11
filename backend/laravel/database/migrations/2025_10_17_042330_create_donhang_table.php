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
        Schema::create('donhang', function (Blueprint $table) {
            $table->string('ma_don_hang', 10)->primary();
            $table->string('ma_khach_hang', 10)->index('ma_khach_hang');
            $table->string('ma_nhan_vien', 10)->index('ma_nhan_vien');
            $table->dateTime('ngay_tao_don')->nullable()->useCurrent();
            $table->string('tinh_trang_don_hang', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donhang');
    }
};
