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
        Schema::table('sanphamtrongdonhang', function (Blueprint $table) {
            $table->foreign(['ma_don_hang'], 'sanphamtrongdonhang_ibfk_1')->references(['ma_don_hang'])->on('donhang')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_san_pham'], 'sanphamtrongdonhang_ibfk_2')->references(['ma_san_pham'])->on('sanpham')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sanphamtrongdonhang', function (Blueprint $table) {
            $table->dropForeign('sanphamtrongdonhang_ibfk_1');
            $table->dropForeign('sanphamtrongdonhang_ibfk_2');
        });
    }
};
