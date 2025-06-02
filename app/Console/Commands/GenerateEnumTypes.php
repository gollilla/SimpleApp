<?php

namespace App\Console\Commands;

use App\Services\EnumService;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class GenerateEnumTypes extends Command
{
    protected $signature = 'generate:enum-types {--output=resources/js/types/enums.d.ts}';
    protected $description = 'EnumHelpersトレイトを持つEnumからTypeScript型定義を生成します';

    public function handle()
    {
        $enumService = app(EnumService::class);
        $enumClasses = $enumService->getEnumClassesWithHelpers();

        if (empty($enumClasses)) {
            $this->info('EnumHelpersトレイトを持つEnumが見つかりませんでした。');
            return 0;
        }

        $outputPath = $this->option('output');
        $outputDir = dirname($outputPath);

        if (!is_dir($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $typeDefinitions = $this->generateTypeDefinitions($enumClasses);
        
        file_put_contents($outputPath, $typeDefinitions);

        $this->info("TypeScript型定義が生成されました: {$outputPath}");
        $this->info("対象Enum: " . implode(', ', array_map(fn($class) => class_basename($class), $enumClasses)));

        return 0;
    }

    private function generateTypeDefinitions(array $enumClasses): string
    {
        $content = "// Auto-generated enum types from PHP Enums with EnumHelpers trait\n";
        $content .= "// Do not modify this file manually\n\n";

        foreach ($enumClasses as $enumClass) {
            $reflection = new \ReflectionEnum($enumClass);
            $enumName = $reflection->getShortName();
            $cases = $reflection->getCases();

            // Enum値の型定義
            $values = array_map(fn($case) => "'" . $case->getBackingValue() . "'", $cases);
            $content .= "export type {$enumName}Value = " . implode(' | ', $values) . ";\n\n";

            // Enumオブジェクトの型定義
            $content .= "export interface {$enumName}Item {\n";
            $content .= "  value: {$enumName}Value;\n";
            $content .= "  name: string;\n";
            $content .= "  label: string;\n";
            $content .= "}\n\n";

            // Enum配列の型定義
            $content .= "export type {$enumName}Array = {$enumName}Item[];\n\n";

            // 選択肢オプションの型定義
            $content .= "export interface {$enumName}Option {\n";
            $content .= "  value: {$enumName}Value;\n";
            $content .= "  label: string;\n";
            $content .= "}\n\n";

            // 選択肢配列の型定義
            $content .= "export type {$enumName}Options = {$enumName}Option[];\n\n";
        }

        // 全体のEnumオブジェクトの型定義
        $enumNames = array_map(fn($class) => class_basename($class), $enumClasses);
        $content .= "export interface AppEnums {\n";
        foreach ($enumNames as $enumName) {
            $content .= "  {$enumName}: {$enumName}Array;\n";
        }
        $content .= "}\n\n";

        // usePage用の型拡張
        $content .= "declare module '@inertiajs/vue3' {\n";
        $content .= "  interface PageProps {\n";
        $content .= "    enums: AppEnums;\n";
        $content .= "  }\n";
        $content .= "}\n";

        return $content;
    }
}