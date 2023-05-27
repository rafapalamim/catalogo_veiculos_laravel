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

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
