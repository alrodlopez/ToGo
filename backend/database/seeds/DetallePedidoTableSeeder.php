<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DetallePedidoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($j = 1; $j <= 10; $j++) {
            $pedido = App\Models\Pedido::findOrFail($j);
            $x = $faker->numberBetween(1, 4);
            for ($i = 1; $i <= $x; $i++) {
                $detalle = App\Models\Detalle::select('id')->get()->random();
                DB::table('detalle_pedido')->insert([
                    'detalle_id' => $detalle['id'],
                    'pedido_id' => $pedido['id'],
                    
                ]);
            }
        }
    }
}
