<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallePedidoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_pedido', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('detalle_id')->index();
            $table->unsignedBigInteger('pedido_id')->index();
            $table->timestamps();
        });

        Schema::table('detalle_pedido', function ($table) {
            $table->foreign('detalle_id')->references('id')->on('detalles')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('pedido_id')->references('id')->on('pedidos')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_pedido');
    }
}
