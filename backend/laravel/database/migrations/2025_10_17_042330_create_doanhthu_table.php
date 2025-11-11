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
        Schema::create('doanhthu', function (Blueprint $table) {
            $table->string('ma_doanh_thu', 10)->primary();
            $table->date('ngay_bao_cao');
            $table->integer('tong_don_hang')->nullable();
            $table->integer('tong_san_pham_ban_ra')->nullable();
            $table->decimal('tong_doanh_thu', 20)->nullable();
            $table->decimal('tong_loi_nhuan', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doanhthu');
    }
};
