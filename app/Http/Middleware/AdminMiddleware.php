<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseInterface;

/**
 * 管理者権限チェックミドルウェア
 * 管理者のみアクセス可能なルートを保護
 */
class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): ResponseInterface
    {
        // 認証されていない場合はログインページへリダイレクト
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // 管理者権限を持たない場合は403エラー
        if (!$request->user()->isAdmin()) {
            abort(Response::HTTP_FORBIDDEN, '管理者権限が必要です。');
        }

        return $next($request);
    }
}