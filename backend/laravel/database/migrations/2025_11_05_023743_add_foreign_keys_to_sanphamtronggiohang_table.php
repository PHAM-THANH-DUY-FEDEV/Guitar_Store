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
        Schema::table('sanphamtronggiohang', function (Blueprint $table) {
            $table->foreign(['ma_gio_hang'], 'sanphamtronggiohang_ibfk_1')->references(['ma_gio_hang'])->on('giohang')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_san_pham'], 'sanphamtronggiohang_ibfk_2')->references(['ma_san_pham'])->on('sanpham')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sanphamtronggiohang', function (Blueprint $table) {
            $table->dropForeign('sanphamtronggiohang_ibfk_1');
            $table->dropForeign('sanphamtronggiohang_ibfk_2');
        });
    }
};
