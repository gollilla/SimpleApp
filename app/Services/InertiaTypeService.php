<?php

namespace App\Services;

use ReflectionClass;

class InertiaTypeService
{
    /**
     * EnumHelpersトレイトを使用するすべてのEnumを取得
     */
    public function getEnumsForFrontend(): array
    {
        $enumsPath = app_path('Enums');
        $enums = [];

        if (!is_dir($enumsPath)) {
            return $enums;
        }

        $files = scandir($enumsPath);
        
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                $className = 'App\\Enums\\' . pathinfo($file, PATHINFO_FILENAME);
                
                if (class_exists($className) && enum_exists($className)) {
                    $reflection = new ReflectionClass($className);
                    
                    // EnumHelpersトレイトを使用しているかチェック
                    $traits = $reflection->getTraitNames();
                    if (in_array('App\\Traits\\EnumHelpers', $traits)) {
                        $enumName = $reflection->getShortName();
                        $enums[$enumName] = $className::toArray();
                    }
                }
            }
        }

        return $enums;
    }

    /**
     * キャッシュ機能付きでEnumデータを取得
     */
    public function getCachedEnumsForFrontend(): array
    {
        return cache()->remember('frontend_enums', 3600, function () {
            return $this->getEnumsForFrontend();
        });
    }
}