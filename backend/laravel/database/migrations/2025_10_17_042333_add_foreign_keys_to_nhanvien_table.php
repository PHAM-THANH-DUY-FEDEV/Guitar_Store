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
        Schema::table('nhanvien', function (Blueprint $table) {
            $table->foreign(['ma_chuc_vu'], 'nhanvien_ibfk_1')->references(['ma_chuc_vu'])->on('chucvu')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('nhanvien', function (Blueprint $table) {
            $table->dropForeign('nhanvien_ibfk_1');
        });
    }
};
