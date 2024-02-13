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
        Schema::create('tpsuaras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dapil_id')->constrained('dapils')->onDelete('restrict');
            $table->foreignId('desa_id')->constrained('desas')->onDelete('restrict');
            $table->string('nama_tpsuara');
            $table->double('jlh_pemilih');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tpsuaras');
    }
};
