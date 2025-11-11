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
        Schema::create('baiviet', function (Blueprint $table) {
            $table->string('ma_bai_viet', 10)->primary();
            $table->string('ma_nhan_vien', 10)->index('ma_nhan_vien');
            $table->string('ma_san_pham', 10)->index('ma_san_pham');
            $table->string('tieu_de');
            $table->text('noi_dung')->nullable();
            $table->dateTime('ngay_dang')->nullable()->useCurrent();
            $table->string('loai_bai_viet', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('baiviet');
    }
};
