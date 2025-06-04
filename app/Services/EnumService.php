<?php

namespace App\Services;

class EnumService
{
    public function convertToArray(array $enums): array
    {
        $result = [];

        foreach ($enums as $enum) {
            if (!is_string($enum) || !enum_exists($enum)) {
                continue;
            }

            $enumClass = new \ReflectionClass($enum);
            $enumName = $enumClass->getShortName();

            if (method_exists($enum, 'toArray')) {
                $array = $enum::toArray();

                foreach ($array as $item) {
                    $result[$enumName][$item['name']] = $item;
                }
            }
        }

        return $result;
    }
}
