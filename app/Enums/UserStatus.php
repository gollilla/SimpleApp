<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum UserStatus: string
{
    use EnumHelpers;

    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case PENDING = 'pending';
    case SUSPENDED = 'suspended';

    public function getLabel(): string
    {
        return match($this) {
            self::ACTIVE => 'アクティブ',
            self::INACTIVE => '非アクティブ',
            self::PENDING => '承認待ち',
            self::SUSPENDED => '停止中',
        };
    }
}