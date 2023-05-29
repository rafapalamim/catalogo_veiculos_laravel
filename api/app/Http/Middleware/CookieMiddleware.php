<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CookieMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if ($request->cookie('APP_TOKEN')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie('APP_TOKEN'));
        }

        return $next($request);
    }
}
