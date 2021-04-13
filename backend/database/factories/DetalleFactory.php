<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Detalle::class, function (Faker $faker) {
    return [
        'nombre' => $faker->word,
        'producto_id' => function(){
            return App\Models\Producto::all()->random();
        }
    ];
});
