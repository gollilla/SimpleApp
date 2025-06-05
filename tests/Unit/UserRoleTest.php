<?php

namespace Tests\Unit;

use App\Enums\UserRole;
use PHPUnit\Framework\TestCase;

/**
 * UserRoleのテストクラス
 */
class UserRoleTest extends TestCase
{
    /**
     * ロールのラベル取得テスト
     */
    public function test_role_labels(): void
    {
        $this->assertEquals('管理者', UserRole::ADMIN->getLabel());
        $this->assertEquals('モデレーター', UserRole::MODERATOR->getLabel());
        $this->assertEquals('一般ユーザー', UserRole::USER->getLabel());
        $this->assertEquals('ゲスト', UserRole::GUEST->getLabel());
    }

    /**
     * 権限レベルのテスト
     */
    public function test_permission_levels(): void
    {
        $this->assertEquals(100, UserRole::ADMIN->getLevel());
        $this->assertEquals(50, UserRole::MODERATOR->getLevel());
        $this->assertEquals(20, UserRole::USER->getLevel());
        $this->assertEquals(10, UserRole::GUEST->getLevel());
    }

    /**
     * 権限チェックのテスト
     */
    public function test_has_permission_level(): void
    {
        // 管理者はすべての権限を持つ
        $this->assertTrue(UserRole::ADMIN->hasPermissionLevel(UserRole::ADMIN));
        $this->assertTrue(UserRole::ADMIN->hasPermissionLevel(UserRole::MODERATOR));
        $this->assertTrue(UserRole::ADMIN->hasPermissionLevel(UserRole::USER));
        $this->assertTrue(UserRole::ADMIN->hasPermissionLevel(UserRole::GUEST));

        // モデレーターは管理者権限は持たない
        $this->assertFalse(UserRole::MODERATOR->hasPermissionLevel(UserRole::ADMIN));
        $this->assertTrue(UserRole::MODERATOR->hasPermissionLevel(UserRole::MODERATOR));
        $this->assertTrue(UserRole::MODERATOR->hasPermissionLevel(UserRole::USER));
        $this->assertTrue(UserRole::MODERATOR->hasPermissionLevel(UserRole::GUEST));

        // 一般ユーザーは管理者・モデレーター権限は持たない
        $this->assertFalse(UserRole::USER->hasPermissionLevel(UserRole::ADMIN));
        $this->assertFalse(UserRole::USER->hasPermissionLevel(UserRole::MODERATOR));
        $this->assertTrue(UserRole::USER->hasPermissionLevel(UserRole::USER));
        $this->assertTrue(UserRole::USER->hasPermissionLevel(UserRole::GUEST));

        // ゲストは自分の権限のみ
        $this->assertFalse(UserRole::GUEST->hasPermissionLevel(UserRole::ADMIN));
        $this->assertFalse(UserRole::GUEST->hasPermissionLevel(UserRole::MODERATOR));
        $this->assertFalse(UserRole::GUEST->hasPermissionLevel(UserRole::USER));
        $this->assertTrue(UserRole::GUEST->hasPermissionLevel(UserRole::GUEST));
    }

    /**
     * ロール判定メソッドのテスト
     */
    public function test_role_check_methods(): void
    {
        // 管理者チェック
        $this->assertTrue(UserRole::ADMIN->isAdmin());
        $this->assertFalse(UserRole::MODERATOR->isAdmin());
        $this->assertFalse(UserRole::USER->isAdmin());
        $this->assertFalse(UserRole::GUEST->isAdmin());

        // モデレーター以上チェック
        $this->assertTrue(UserRole::ADMIN->isModerator());
        $this->assertTrue(UserRole::MODERATOR->isModerator());
        $this->assertFalse(UserRole::USER->isModerator());
        $this->assertFalse(UserRole::GUEST->isModerator());

        // 一般ユーザー以上チェック
        $this->assertTrue(UserRole::ADMIN->isUser());
        $this->assertTrue(UserRole::MODERATOR->isUser());
        $this->assertTrue(UserRole::USER->isUser());
        $this->assertFalse(UserRole::GUEST->isUser());
    }
}