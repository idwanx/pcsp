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
        Schema::create('calon_tpsuara', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calon_id')->constrained('calons')->onDelete('restrict');
            $table->foreignId('tpsuara_id')->constrained('tpsuaras')->onDelete('restrict');
            $table->double('jlh_suara_tps')->default('0');
            $table->double('jlh_suara_kpu')->default('0');
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'calon_tpsuara_user_id'
            )->onDelete('restrict');
            $table->foreignId('user_verified')->nullable()->constrained(
                table: 'users', indexName: 'calontpsuara_user_verified'
            )->onDelete('restrict');
            $table->timestamp('is_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calon_tpsuara');
    }
};
