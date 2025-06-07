<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * マイページコントローラー
 * 
 * ユーザーの個人情報や活動履歴を表示する
 */
class MyPageController extends Controller
{
    /**
     * マイページを表示
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        
        return Inertia::render('MyPage/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'created_at' => $user->created_at->format('Y年m月d日'),
                'email_verified_at' => $user->email_verified_at?->format('Y年m月d日 H:i'),
            ],
        ]);
    }
}