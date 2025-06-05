<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\UserStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * ユーザーテーブルにステータスカラムを追加
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('status', array_column(UserStatus::cases(), 'value'))
                  ->default(UserStatus::ACTIVE->value)
                  ->after('role')
                  ->comment('ユーザーステータス');
        });
    }

    /**
     * Reverse the migrations.
     * 
     * ユーザーテーブルからステータスカラムを削除
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
