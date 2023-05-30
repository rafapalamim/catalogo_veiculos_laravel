<?php

namespace App\Models;

use App\Casts\FileCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'marca',
        'modelo',
        'foto',
        'valor'
    ];

    protected $casts = [
        'valor' => 'float',
        'foto' => FileCast::class
    ];
}
