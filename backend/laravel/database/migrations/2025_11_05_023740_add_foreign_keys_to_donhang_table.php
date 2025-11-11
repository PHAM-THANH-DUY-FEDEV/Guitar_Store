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
        Schema::table('donhang', function (Blueprint $table) {
            $table->foreign(['ma_khach_hang'], 'donhang_ibfk_1')->references(['ma_khach_hang'])->on('khachhang')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_nhan_vien'], 'donhang_ibfk_2')->references(['ma_nhan_vien'])->on('nhanvien')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('donhang', function (Blueprint $table) {
            $table->dropForeign('donhang_ibfk_1');
            $table->dropForeign('donhang_ibfk_2');
        });
    }
};
