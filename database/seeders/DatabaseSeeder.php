<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use App\Enums\UserStatus;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 管理者ユーザーを作成
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => UserRole::ADMIN,
            'status' => UserStatus::ACTIVE,
        ]);

        // モデレーターユーザーを作成
        User::factory()->create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'role' => UserRole::MODERATOR,
            'status' => UserStatus::ACTIVE,
        ]);

        // 一般ユーザーを作成
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'role' => UserRole::USER,
            'status' => UserStatus::ACTIVE,
        ]);

        // 停止中ユーザーを作成
        User::factory()->create([
            'name' => 'Suspended User',
            'email' => 'suspended@example.com',
            'role' => UserRole::USER,
            'status' => UserStatus::SUSPENDED,
        ]);

        // 承認待ちユーザーを作成
        User::factory()->create([
            'name' => 'Pending User',
            'email' => 'pending@example.com',
            'role' => UserRole::USER,
            'status' => UserStatus::PENDING,
        ]);

        // 追加のテストユーザーを10人作成
        User::factory(10)->create([
            'role' => UserRole::USER,
            'status' => UserStatus::ACTIVE,
        ]);
    }
}
