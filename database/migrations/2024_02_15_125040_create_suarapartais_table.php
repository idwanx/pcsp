<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suarapartais', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partai_id')->constrained('partais')->onDelete('restrict');
            $table->foreignId('tpsuara_id')->constrained('tpsuaras')->onDelete('restrict');
            $table->double('jlh_suara')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suarapartais');
    }
};
