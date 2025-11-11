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
        Schema::table('baiviet', function (Blueprint $table) {
            $table->foreign(['ma_nhan_vien'], 'baiviet_ibfk_1')->references(['ma_nhan_vien'])->on('nhanvien')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ma_san_pham'], 'baiviet_ibfk_2')->references(['ma_san_pham'])->on('sanpham')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('baiviet', function (Blueprint $table) {
            $table->dropForeign('baiviet_ibfk_1');
            $table->dropForeign('baiviet_ibfk_2');
        });
    }
};
