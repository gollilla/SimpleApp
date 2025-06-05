<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

/**
 * ユーザー管理コントローラー
 * 
 * 管理画面でのユーザー管理機能（CRUD操作）を提供します
 */
class UserController extends Controller
{
    /**
     * ユーザー一覧を表示
     */
    public function index(Request $request): Response
    {
        $query = User::query();

        // 検索フィルター
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // ロールフィルター
        if ($request->filled('role')) {
            $query->where('role', $request->get('role'));
        }

        // ステータスフィルター
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // ソート
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $users = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    /**
     * ユーザー詳細を表示
     */
    public function show(User $user): Response
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * ユーザー作成フォームを表示
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * 新規ユーザーを作成
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:' . implode(',', array_column(UserRole::cases(), 'value')),
            'status' => 'required|string|in:' . implode(',', array_column(UserStatus::cases(), 'value')),
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'ユーザーが正常に作成されました。');
    }

    /**
     * ユーザー編集フォームを表示
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * ユーザー情報を更新
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|string|in:' . implode(',', array_column(UserRole::cases(), 'value')),
            'status' => 'required|string|in:' . implode(',', array_column(UserStatus::cases(), 'value')),
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'status' => $request->status,
        ];

        // パスワードが入力されている場合のみ更新
        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return redirect()->route('admin.users.index')
            ->with('success', 'ユーザー情報が正常に更新されました。');
    }

    /**
     * ユーザーを削除
     */
    public function destroy(User $user): RedirectResponse
    {
        // 自分自身を削除することはできない
        if ($user->id === auth()->id()) {
            return redirect()->back()
                ->with('error', '自分自身を削除することはできません。');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'ユーザーが正常に削除されました。');
    }
}