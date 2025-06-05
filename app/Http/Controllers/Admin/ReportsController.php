<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserStatus;
use Inertia\Inertia;
use Inertia\Response;

/**
 * レポート機能コントローラー
 * 
 * システムの各種レポート機能を提供します
 */
class ReportsController extends Controller
{
    /**
     * ユーザー活動レポートを表示
     */
    public function userActivity(): Response
    {
        // ユーザー登録推移（過去30日）
        $userRegistrations = collect();
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $count = User::whereDate('created_at', $date)->count();
            $userRegistrations->push([
                'date' => $date,
                'count' => $count,
            ]);
        }

        // ステータス別ユーザー数
        $userStatusCounts = [
            'active' => User::where('status', UserStatus::ACTIVE)->count(),
            'inactive' => User::where('status', UserStatus::INACTIVE)->count(),
            'pending' => User::where('status', UserStatus::PENDING)->count(),
            'suspended' => User::where('status', UserStatus::SUSPENDED)->count(),
        ];

        return Inertia::render('Admin/Reports/UserActivity', [
            'userRegistrations' => $userRegistrations,
            'userStatusCounts' => $userStatusCounts,
        ]);
    }

    /**
     * システム使用状況レポートを表示
     */
    public function systemUsage(): Response
    {
        // 基本的なシステム情報
        $systemInfo = [
            'total_users' => User::count(),
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
        ];

        return Inertia::render('Admin/Reports/SystemUsage', [
            'systemInfo' => $systemInfo,
        ]);
    }
}