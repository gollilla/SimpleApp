<?php

namespace App\Traits;

trait EnumHelpers
{
    public static function toArray(): array
    {
        return array_map(
            fn(self $enum) => [
                'value' => $enum->value,
                'name' => $enum->name,
                'label' => $enum->getLabel()
            ],
            self::cases()
        );
    }

    public static function getOptions(): array
    {
        return array_map(
            fn(self $enum) => [
                'value' => $enum->value,
                'label' => $enum->getLabel()
            ],
            self::cases()
        );
    }

    public function getLabel(): string
    {
        return match($this) {
            default => $this->name
        };
    }
}
