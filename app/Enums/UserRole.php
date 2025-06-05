<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

/**
 * ユーザーロール定義
 * 
 * システム内でのユーザーの権限レベルを定義します
 */
enum UserRole: string
{
    use EnumHelpers;

    /** 管理者 - 全ての機能にアクセス可能 */
    case ADMIN = 'admin';
    
    /** モデレーター - コンテンツ管理機能にアクセス可能 */
    case MODERATOR = 'moderator';
    
    /** 一般ユーザー - 基本機能のみアクセス可能 */
    case USER = 'user';
    
    /** ゲスト - 限定的な機能のみアクセス可能 */
    case GUEST = 'guest';

    /**
     * ロールの表示名を取得
     */
    public function getLabel(): string
    {
        return match($this) {
            self::ADMIN => '管理者',
            self::MODERATOR => 'モデレーター',
            self::USER => '一般ユーザー',
            self::GUEST => 'ゲスト',
        };
    }

    /**
     * ロールの説明を取得
     */
    public function getDescription(): string
    {
        return match($this) {
            self::ADMIN => 'システム全体の管理・設定が可能',
            self::MODERATOR => 'コンテンツの管理・監視が可能',
            self::USER => '一般的な機能の利用が可能',
            self::GUEST => '閲覧などの限定的な機能のみ利用可能',
        };
    }

    /**
     * 権限レベルを数値で取得（高いほど強い権限）
     */
    public function getLevel(): int
    {
        return match($this) {
            self::ADMIN => 100,
            self::MODERATOR => 50,
            self::USER => 20,
            self::GUEST => 10,
        };
    }

    /**
     * 指定されたロール以上の権限を持っているかチェック
     */
    public function hasPermissionLevel(UserRole $requiredRole): bool
    {
        return $this->getLevel() >= $requiredRole->getLevel();
    }

    /**
     * 管理者権限を持っているかチェック
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * モデレーター以上の権限を持っているかチェック
     */
    public function isModerator(): bool
    {
        return $this->hasPermissionLevel(self::MODERATOR);
    }

    /**
     * 一般ユーザー以上の権限を持っているかチェック
     */
    public function isUser(): bool
    {
        return $this->hasPermissionLevel(self::USER);
    }
}