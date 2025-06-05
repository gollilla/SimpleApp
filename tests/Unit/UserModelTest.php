<?php

namespace Tests\Unit;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Userモデルのロール機能テストクラス
 */
class UserModelTest extends TestCase
{
    use RefreshDatabase;

    /**
     * ユーザーのデフォルトロールテスト
     */
    public function test_user_default_role(): void
    {
        $user = User::factory()->create();
        $this->assertEquals(UserRole::USER, $user->getRole());
    }

    /**
     * ユーザーのロール設定テスト
     */
    public function test_user_role_assignment(): void
    {
        $user = User::factory()->create(['role' => UserRole::ADMIN]);
        $this->assertEquals(UserRole::ADMIN, $user->getRole());
        $this->assertTrue($user->isAdmin());
    }

    /**
     * ユーザーの権限チェックテスト
     */
    public function test_user_permission_checks(): void
    {
        // 管理者ユーザー
        $admin = User::factory()->create(['role' => UserRole::ADMIN]);
        $this->assertTrue($admin->hasRole(UserRole::ADMIN));
        $this->assertTrue($admin->hasRole(UserRole::MODERATOR));
        $this->assertTrue($admin->hasRole(UserRole::USER));
        $this->assertTrue($admin->hasRole(UserRole::GUEST));
        $this->assertTrue($admin->isAdmin());
        $this->assertTrue($admin->isModerator());
        $this->assertTrue($admin->isUser());

        // モデレーターユーザー
        $moderator = User::factory()->create(['role' => UserRole::MODERATOR]);
        $this->assertFalse($moderator->hasRole(UserRole::ADMIN));
        $this->assertTrue($moderator->hasRole(UserRole::MODERATOR));
        $this->assertTrue($moderator->hasRole(UserRole::USER));
        $this->assertTrue($moderator->hasRole(UserRole::GUEST));
        $this->assertFalse($moderator->isAdmin());
        $this->assertTrue($moderator->isModerator());
        $this->assertTrue($moderator->isUser());

        // 一般ユーザー
        $user = User::factory()->create(['role' => UserRole::USER]);
        $this->assertFalse($user->hasRole(UserRole::ADMIN));
        $this->assertFalse($user->hasRole(UserRole::MODERATOR));
        $this->assertTrue($user->hasRole(UserRole::USER));
        $this->assertTrue($user->hasRole(UserRole::GUEST));
        $this->assertFalse($user->isAdmin());
        $this->assertFalse($user->isModerator());
        $this->assertTrue($user->isUser());

        // ゲストユーザー
        $guest = User::factory()->create(['role' => UserRole::GUEST]);
        $this->assertFalse($guest->hasRole(UserRole::ADMIN));
        $this->assertFalse($guest->hasRole(UserRole::MODERATOR));
        $this->assertFalse($guest->hasRole(UserRole::USER));
        $this->assertTrue($guest->hasRole(UserRole::GUEST));
        $this->assertFalse($guest->isAdmin());
        $this->assertFalse($guest->isModerator());
        $this->assertFalse($guest->isUser());
    }

    /**
     * ロールがnullの場合のテスト
     */
    public function test_user_null_role_defaults_to_user(): void
    {
        $user = new User();
        $user->role = null;
        $this->assertEquals(UserRole::USER, $user->getRole());
    }
}