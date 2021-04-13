<?php

use Illuminate\Database\Seeder;
use App\Models\Detalle;

class DetalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Detalle::class, 15)->create();
    }
}
