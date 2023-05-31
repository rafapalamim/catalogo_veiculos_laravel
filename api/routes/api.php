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
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, "login"]);
    Route::get('status', [AuthController::class, "isLogged"])->middleware('auth');
});


Route::group([
    'prefix' => 'vehicle'
], function () {

    // Listar
    Route::get('', [VehicleController::class, "list"]);

    // Visualizar
    Route::get('/{id}', [VehicleController::class, "find"])->middleware('auth');

    // Cadastrar
    Route::post('', [VehicleController::class, "store"])->middleware('auth');
    Route::post('/photo/{id}', [VehicleController::class, "newPhoto"])->middleware('auth');

    // Editar
    Route::put('/{id}', [VehicleController::class, "update"])->middleware('auth');

    // Deletar
    Route::delete('/{id}', [VehicleController::class, "destroy"])->middleware('auth');
});
