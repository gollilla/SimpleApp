<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Services\InertiaTypeService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $inertiaTypeService = app(InertiaTypeService::class);
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'enums' => $inertiaTypeService->getCachedEnumsForFrontend(),
        ];
    }
}
