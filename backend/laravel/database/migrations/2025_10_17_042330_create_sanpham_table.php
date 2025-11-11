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
        Schema::create('sanpham', function (Blueprint $table) {
            $table->string('ma_san_pham', 10)->primary();
            $table->string('ten_san_pham');
            $table->string('hang_san_xuat', 100)->nullable();
            $table->integer('nam_san_xuat')->nullable();
            $table->string('loai_san_pham', 100)->nullable();
            $table->text('mo_ta_san_pham')->nullable();
            $table->decimal('gia_san_pham', 15);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sanpham');
    }
};
