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
        Schema::create('chucvu', function (Blueprint $table) {
            $table->string('ma_chuc_vu', 10)->primary();
            $table->string('ten_chuc_vu', 100);
            $table->string('quyen_truy_cap')->nullable();
            $table->text('mo_ta_chuc_vu')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chucvu');
    }
};
