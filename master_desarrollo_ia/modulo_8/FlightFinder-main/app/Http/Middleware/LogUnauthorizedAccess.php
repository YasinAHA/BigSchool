<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class LogUnauthorizedAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check()) {
            Log::channel('security')->notice('Unauthorized access attempt', [
                'ip' => $request->ip(),
                'route' => $request->route()->getName() ?? $request->path(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return $next($request);
    }
}