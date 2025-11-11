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
        Schema::table('binhluancuakhachhang', function (Blueprint $table) {
            $table->foreign(['ma_bai_viet'], 'binhluancuakhachhang_ibfk_1')->references(['ma_bai_viet'])->on('baiviet')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_khach_hang'], 'binhluancuakhachhang_ibfk_2')->references(['ma_khach_hang'])->on('khachhang')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('binhluancuakhachhang', function (Blueprint $table) {
            $table->dropForeign('binhluancuakhachhang_ibfk_1');
            $table->dropForeign('binhluancuakhachhang_ibfk_2');
        });
    }
};
