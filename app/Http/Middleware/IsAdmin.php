<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * 管理者権限チェックミドルウェア
 * 
 * 管理者以上の権限を持つユーザーのみアクセスを許可します
 */
class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 認証されていない場合はログインページにリダイレクト
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // 管理者権限がない場合は403エラー
        if (!auth()->user()->isAdmin()) {
            abort(403, 'この操作には管理者権限が必要です。');
        }

        return $next($request);
    }
}