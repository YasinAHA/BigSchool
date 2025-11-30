<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            $message = 'Failed login attempt';
            $context = [
                'ip' => $request->ip(),
                'email' => $request->input('email'),
                'user_agent' => $request->userAgent(),
            ];

            // Siempre escribe en security.log
            Log::channel('security')->warning($message, $context);

            // Si Telescope está instalado y en local, también lo muestra ahí
            if (class_exists(\Laravel\Telescope\Telescope::class) && app()->environment('local')) {
                Log::channel('telescope')->info($message, $context);
            }

            throw ValidationException::withMessages([
                'email' => [__('Credenciales inválidas.')],
            ]);
        }

        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
