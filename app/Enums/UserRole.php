<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum UserRole: string
{
    use EnumHelpers;

    case USER = 'user';
    case ADMIN = 'admin';

    public function getLabel(): string
    {
        return match($this) {
            self::USER => 'ユーザー',
            self::ADMIN => '管理者',
        };
    }
}