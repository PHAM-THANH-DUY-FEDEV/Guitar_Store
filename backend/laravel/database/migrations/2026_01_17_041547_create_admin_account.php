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
        Schema::create('admin_account', function (Blueprint $table) {
            $table->string('ma_admin')->primary();
            $table->string('dia_chi');
            $table->string('ten_dang_nhap')->unique();
            $table->string('email_admin')->unique();
            $table->string('so_dien_thoai',11)->unique()->nullable();
            $table->string('mat_khau');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_account');
    }
};
