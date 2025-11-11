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
        Schema::create('binhluancuakhachhang', function (Blueprint $table) {
            $table->string('ma_binh_luan', 10)->primary();
            $table->string('ma_bai_viet', 10)->index('ma_bai_viet');
            $table->string('ma_khach_hang', 10)->index('ma_khach_hang');
            $table->text('noi_dung_binh_luan')->nullable();
            $table->date('ngay_binh_luan')->nullable();
            $table->time('gio_binh_luan')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('binhluancuakhachhang');
    }
};
