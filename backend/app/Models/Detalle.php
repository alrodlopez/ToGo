<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detalle extends Model
{
    use SoftDeletes;

    protected $table = 'detalles';
    protected $dates = ['deleted_at'];

    protected $primaryKey = 'id';

    protected $fillable = ['nombre','producto_id'];

    public function producto()
    {
        return $this->belongsTo('App\Models\Producto','producto_id');
    }

    public function pedidos()
    {
        return $this->belongsToMany('App\Models\Pedido');
    }
}
