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
        Schema::table('binhluancuanhanvien', function (Blueprint $table) {
            $table->foreign(['ma_bai_viet'], 'binhluancuanhanvien_ibfk_1')->references(['ma_bai_viet'])->on('baiviet')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_nhan_vien'], 'binhluancuanhanvien_ibfk_2')->references(['ma_nhan_vien'])->on('nhanvien')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('binhluancuanhanvien', function (Blueprint $table) {
            $table->dropForeign('binhluancuanhanvien_ibfk_1');
            $table->dropForeign('binhluancuanhanvien_ibfk_2');
        });
    }
};
