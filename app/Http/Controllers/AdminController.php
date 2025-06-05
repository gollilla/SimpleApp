<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * 管理者コントローラー
 * 管理画面の各種機能を提供
 */
class AdminController extends Controller
{
    /**
     * 管理画面ダッシュボード
     * 
     * @return Response
     */
    public function dashboard(): Response
    {
        // 統計データを取得
        $stats = [
            'total_users' => User::count(),
            'admin_users' => User::where('role', UserRole::ADMIN)->count(),
            'regular_users' => User::where('role', UserRole::USER)->count(),
            'verified_users' => User::whereNotNull('email_verified_at')->count(),
        ];

        // 最近登録されたユーザー（5件）
        $recent_users = User::latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->value,
                    'role_label' => $user->getRoleLabel(),
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
        ]);
    }

    /**
     * ユーザー管理一覧
     * 
     * @param Request $request
     * @return Response
     */
    public function users(Request $request): Response
    {
        $query = User::query();

        // 検索機能
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // ロールフィルター
        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        // ページネーション
        $users = $query->latest()
            ->paginate(10)
            ->through(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->value,
                    'role_label' => $user->getRoleLabel(),
                    'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i:s'),
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
            'role_options' => UserRole::getOptions(),
        ]);
    }

    /**
     * ユーザー情報更新
     * 
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateUser(Request $request, User $user)
    {
        // 自分自身の権限変更を防ぐ
        if ($user->id === $request->user()->id && $request->role !== $user->role->value) {
            return back()->withErrors(['role' => '自分自身のロールは変更できません。']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:' . implode(',', array_map(fn($role) => $role->value, UserRole::cases())),
        ]);

        $user->update($validated);

        return back()->with('success', 'ユーザー情報を更新しました。');
    }

    /**
     * ユーザー削除
     * 
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteUser(Request $request, User $user)
    {
        // 自分自身の削除を防ぐ
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['delete' => '自分自身を削除することはできません。']);
        }

        $user->delete();

        return back()->with('success', 'ユーザーを削除しました。');
    }
}