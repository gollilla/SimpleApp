<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests;
use ReflectionClass;
use ReflectionMethod;
use ReflectionParameter;
use ReflectionType;
use ReflectionUnionType;
use ReflectionNamedType;

class GenerateInertiaTypes extends Command
{
    protected $signature = 'generate:inertia-types';
    protected $description = 'Generate TypeScript type definitions for Inertia shared props';

    public function handle()
    {
        $this->info('Generating TypeScript types for Inertia shared props...');

        try {
            $types = $this->generateTypes();
            $this->writeTypesFile($types);
            $this->info('TypeScript types generated successfully!');
        } catch (\Exception $e) {
            $this->error('Failed to generate types: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    private function generateTypes(): array
    {
        // HandleInertiaRequestsミドルウェアのshareメソッドを解析
        $middleware = new HandleInertiaRequests();
        $reflection = new ReflectionClass($middleware);
        $shareMethod = $reflection->getMethod('share');

        // 現在のshareメソッドの実装をより詳しく解析
        $types = [
            'auth' => [
                'type' => 'object',
                'properties' => [
                    'user' => [
                        'type' => 'User | null',
                        'description' => 'Authenticated user'
                    ]
                ]
            ]
        ];

        // EnumHelpersトレイトを使用するEnumを自動検出
        $enumTypes = $this->detectEnums();
        if (!empty($enumTypes)) {
            $types['enums'] = [
                'type' => 'object',
                'properties' => $enumTypes
            ];
        }

        return $types;
    }

    private function detectEnums(): array
    {
        $enumsPath = app_path('Enums');
        $enumTypes = [];

        if (!is_dir($enumsPath)) {
            return $enumTypes;
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
                        $enumTypes[$enumName] = [
                            'type' => 'Array<{ value: string; name: string; label: string }>',
                            'description' => "Values for {$enumName} enum"
                        ];
                    }
                }
            }
        }

        return $enumTypes;
    }

    private function writeTypesFile(array $types): void
    {
        $content = $this->generateTypeScriptContent($types);
        
        $typesPath = resource_path('js/types/inertia.d.ts');
        
        // ディレクトリが存在しない場合は作成
        $dir = dirname($typesPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents($typesPath, $content);
    }

    private function generateTypeScriptContent(array $types): string
    {
        $content = "import { DefineComponent } from 'vue'\n\n";
        
        // User型の定義
        $content .= "export interface User {\n";
        $content .= "  id: number;\n";
        $content .= "  name: string;\n";
        $content .= "  email: string;\n";
        $content .= "  email_verified_at: string | null;\n";
        $content .= "}\n\n";

        // Enum型の定義（enumsが存在する場合）
        if (isset($types['enums'])) {
            $content .= "export interface EnumValue {\n";
            $content .= "  value: string;\n";
            $content .= "  name: string;\n";
            $content .= "  label: string;\n";
            $content .= "}\n\n";

            $content .= "export interface Enums {\n";
            foreach ($types['enums']['properties'] as $enumName => $enumType) {
                $content .= "  {$enumName}: EnumValue[];\n";
            }
            $content .= "}\n\n";
        }

        // PageProps型の定義
        $content .= "export interface PageProps {\n";
        
        foreach ($types as $key => $typeInfo) {
            if ($key === 'auth') {
                $content .= "  auth: {\n";
                $content .= "    user: User | null;\n";
                $content .= "  };\n";
            } elseif ($key === 'enums') {
                $content .= "  enums?: Enums;\n";
            }
        }
        
        $content .= "  [key: string]: any;\n";
        $content .= "}\n\n";

        // Inertia helper module declaration
        $content .= "declare module 'laravel-vite-plugin/inertia-helpers' {\n";
        $content .= "  export function resolvePageComponent(\n";
        $content .= "    path: string,\n";
        $content .= "    pages: Record<string, () => Promise<{ default: DefineComponent }>>\n";
        $content .= "  ): Promise<DefineComponent>;\n";
        $content .= "}\n";

        return $content;
    }
}