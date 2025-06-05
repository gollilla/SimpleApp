<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

/**
 * ユーザーロール列挙型
 * ユーザーの権限レベルを定義
 */
enum UserRole: string
{
    use EnumHelpers;

    case USER = 'user';
    case ADMIN = 'admin';

    /**
     * ロールのラベルを取得
     * 
     * @return string ロールの日本語ラベル
     */
    public function getLabel(): string
    {
        return match($this) {
            self::USER => 'ユーザー',
            self::ADMIN => '管理者',
        };
    }

    /**
     * 管理者権限を持つかチェック
     * 
     * @return bool 管理者権限を持つ場合true
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * 一般ユーザー権限かチェック
     * 
     * @return bool 一般ユーザーの場合true
     */
    public function isUser(): bool
    {
        return $this === self::USER;
    }
}