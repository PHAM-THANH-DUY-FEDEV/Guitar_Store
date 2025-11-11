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
        Schema::create('sanphamtrongdonhang', function (Blueprint $table) {
            $table->string('ma_don_hang', 10);
            $table->string('ma_san_pham', 10)->index('ma_san_pham');
            $table->integer('so_luong');
            $table->decimal('gia_san_pham', 15);
            $table->decimal('thanh_tien', 15);

            $table->primary(['ma_don_hang', 'ma_san_pham']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sanphamtrongdonhang');
    }
};
