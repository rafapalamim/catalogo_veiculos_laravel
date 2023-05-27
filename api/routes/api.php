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
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, "login"]);
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
    Route::get('{id}', [VehicleController::class, "find"]);
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'vehicle'
], function () {

    // Cadastrar
    Route::post('', [VehicleController::class, "store"]);

    // Editar
    Route::put('/{id}', [VehicleController::class, "update"]);

    // Deletar
    Route::delete('/{id}', [VehicleController::class, "destroy"]);
});
