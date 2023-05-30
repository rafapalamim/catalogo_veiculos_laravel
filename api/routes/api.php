<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'cookie.auth:auth:api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, "login"]);
    Route::get('status', [AuthController::class, "isLogged"]);
});

// Sem autenticação:
// Vehicle: Lista, Buscar
// Painel: Login

// Com autenticação
// Vehicle: cadastrar, editar, deletar
// Painel: controles do sistema

Route::group([
    'middleware' => 'api',
    'prefix' => 'vehicle'
], function () {

    // Listar
    Route::get('', [VehicleController::class, "list"]);

    // Visualizar
    Route::get('/{id}', [VehicleController::class, "find"]);
});

Route::group([
    'middleware' => 'cookie.auth:auth:api',
    'prefix' => 'vehicle'
], function () {

    // Cadastrar
    Route::post('', [VehicleController::class, "store"]);
    Route::post('/photo/{id}', [VehicleController::class, "newPhoto"]);

    // Editar
    Route::put('/{id}', [VehicleController::class, "update"]);

    // Deletar
    Route::delete('/{id}', [VehicleController::class, "destroy"]);
});
