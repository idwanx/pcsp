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
        Schema::create('dokumentpsuaras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tpsuara_id')->constrained('tpsuaras')->onDelete('restrict');
            $table->string('keterangan');
            $table->text('files')->nullable();
            $table->text('nameoriginalfiles')->nullable();
            $table->string('extentionfiles');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->timestamp('lock_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumentpsuaras');
    }
};
