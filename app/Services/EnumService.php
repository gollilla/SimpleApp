<?php

namespace App\Services;

use App\Traits\EnumHelpers;
use ReflectionClass;
use ReflectionEnum;
use Symfony\Component\Finder\Finder;

class EnumService
{
    private array $cachedEnums = [];

    public function getEnumsWithHelpers(): array
    {
        if (!empty($this->cachedEnums)) {
            return $this->cachedEnums;
        }

        $enums = [];
        $enumFiles = $this->findEnumFiles();

        foreach ($enumFiles as $file) {
            $className = $this->getClassNameFromFile($file);
            
            if (!$className || !enum_exists($className)) {
                continue;
            }

            $reflection = new ReflectionEnum($className);
            
            if ($this->usesEnumHelpers($reflection)) {
                $shortName = $reflection->getShortName();
                $enums[$shortName] = $className::toArray();
            }
        }

        $this->cachedEnums = $enums;
        return $enums;
    }

    public function getEnumClassesWithHelpers(): array
    {
        $classes = [];
        $enumFiles = $this->findEnumFiles();

        foreach ($enumFiles as $file) {
            $className = $this->getClassNameFromFile($file);
            
            if (!$className || !enum_exists($className)) {
                continue;
            }

            $reflection = new ReflectionEnum($className);
            
            if ($this->usesEnumHelpers($reflection)) {
                $classes[] = $className;
            }
        }

        return $classes;
    }

    private function findEnumFiles(): array
    {
        $finder = new Finder();
        $files = [];

        try {
            $finder->files()
                ->in(app_path('Enums'))
                ->name('*.php');

            foreach ($finder as $file) {
                $files[] = $file->getRealPath();
            }
        } catch (\Exception $e) {
            // Enumsディレクトリが存在しない場合は空配列を返す
        }

        return $files;
    }

    private function getClassNameFromFile(string $filePath): ?string
    {
        $contents = file_get_contents($filePath);
        
        // 名前空間の抽出
        if (preg_match('/namespace\s+([^;]+);/', $contents, $namespaceMatches)) {
            $namespace = $namespaceMatches[1];
        } else {
            return null;
        }

        // enum名の抽出
        if (preg_match('/enum\s+(\w+)/', $contents, $enumMatches)) {
            $enumName = $enumMatches[1];
        } else {
            return null;
        }

        return $namespace . '\\' . $enumName;
    }

    private function usesEnumHelpers(ReflectionEnum $reflection): bool
    {
        return in_array(EnumHelpers::class, $reflection->getTraitNames());
    }

    public function clearCache(): void
    {
        $this->cachedEnums = [];
    }
}