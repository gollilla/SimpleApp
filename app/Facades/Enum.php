<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static array convertToArray(array<int, class-string<\BackedEnum> $enums)
 */
class Enum extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'enum.service';
    }
}
