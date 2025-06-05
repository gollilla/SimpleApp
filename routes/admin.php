<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ReportsController;
use Illuminate\Support\Facades\Route;

/**
 * 管理画面ルート定義
 * 
 * 管理者権限を持つユーザーのみアクセス可能な管理機能を提供します
 */
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // 管理画面ダッシュボード
    Route::get('dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // ユーザー管理
    Route::resource('users', UserController::class);
    
    // システム設定
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::get('settings/general', [SettingsController::class, 'general'])->name('settings.general');
    Route::get('settings/security', [SettingsController::class, 'security'])->name('settings.security');
    
    // レポート機能
    Route::get('reports/users', [ReportsController::class, 'userActivity'])->name('reports.users');
    Route::get('reports/system', [ReportsController::class, 'systemUsage'])->name('reports.system');
});