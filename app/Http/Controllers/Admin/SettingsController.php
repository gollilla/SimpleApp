<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

/**
 * 設定管理コントローラー
 * 
 * システム設定機能を提供します
 */
class SettingsController extends Controller
{
    /**
     * 設定一覧を表示
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index');
    }

    /**
     * 一般設定を表示
     */
    public function general(): Response
    {
        return Inertia::render('Admin/Settings/General');
    }

    /**
     * セキュリティ設定を表示
     */
    public function security(): Response
    {
        return Inertia::render('Admin/Settings/Security');
    }
}