<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserStatus;
use Inertia\Inertia;
use Inertia\Response;

/**
 * 管理画面メインコントローラー
 * 
 * 管理画面のダッシュボード機能を提供します
 */
class AdminController extends Controller
{
    /**
     * 管理画面ダッシュボードを表示
     */
    public function dashboard(): Response
    {
        // ユーザー統計を取得
        $userStats = [
            'total' => User::count(),
            'active' => User::where('status', UserStatus::ACTIVE)->count(),
            'inactive' => User::where('status', UserStatus::INACTIVE)->count(),
            'pending' => User::where('status', UserStatus::PENDING)->count(),
            'suspended' => User::where('status', UserStatus::SUSPENDED)->count(),
        ];

        // 最近登録されたユーザー（上位5件）
        $recentUsers = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'status', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'userStats' => $userStats,
            'recentUsers' => $recentUsers,
        ]);
    }
}