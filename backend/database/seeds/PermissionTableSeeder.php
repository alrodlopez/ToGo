<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->truncateTables([
            'permissions'
        ]);

        //Crear Roles para poner el sistema en Produccion.
        Permission::create(['name' => 'AdminApp']);
        Permission::create(['name' => 'Restaurante']);
        Permission::create(['name' => 'Cliente']);
        Permission::create(['name' => 'Repartidor']);
    }

    public function truncateTables(array $tables)
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
    
}
