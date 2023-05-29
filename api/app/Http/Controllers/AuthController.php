<?php

namespace App\Http\Controllers;

use App\Http\Requests\MakeAuthRequest;
use Illuminate\Http\Response;

class AuthController extends Controller
{

    public function login(MakeAuthRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $ttl = auth()->factory()->getTTL();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $ttl
        ])->withCookie(cookie("APP_TOKEN", $token, $ttl, null, null, false, true));
    }

    public function isLogged()
    {
        if (auth()->check()) {
            return response()
                ->json('', Response::HTTP_OK);
        }

        return response()
            ->json('', Response::HTTP_UNAUTHORIZED);
    }
}
