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
        Schema::create('suararusaks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(
                table: 'users', indexName: 'suararusaks_user'
            )->onDelete('restrict');
            $table->foreignId('tpsuara_id')->constrained('tpsuaras')->onDelete('restrict');
            $table->double('suara_rusak')->default('0');
            $table->foreignId('user_verified')->nullable()->constrained(
                table: 'users', indexName: 'tpsuara_user_verified'
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
        Schema::dropIfExists('suararusaks');
    }
};
