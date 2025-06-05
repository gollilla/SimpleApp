<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

/**
 * 管理者専用ルート
 * 管理者ミドルウェアで保護されている
 */
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // 管理画面ダッシュボード
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // ユーザー管理
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::patch('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');
});