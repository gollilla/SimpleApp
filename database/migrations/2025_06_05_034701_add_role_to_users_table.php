<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\UserRole;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * ユーザーテーブルにロールカラムを追加
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', array_column(UserRole::cases(), 'value'))
                  ->default(UserRole::USER->value)
                  ->after('email_verified_at')
                  ->comment('ユーザーロール');
        });
    }

    /**
     * Reverse the migrations.
     * 
     * ユーザーテーブルからロールカラムを削除
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};