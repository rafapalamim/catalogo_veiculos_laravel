<?php

namespace App\Http\Controllers;

use App\Http\Requests\MakeAuthRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(MakeAuthRequest $request)
    {
        $credentials = $request->validated();

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $ttl = auth()->factory()->getTTL() * 60;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $ttl
        ])->withCookie(cookie("APP_TOKEN", $token, 10, null, null, false, true));
    }
}
