<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class DetalleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'detalle_id' => $this->id,
            'nombre' => $this->nombre,
            'producto_id' =>$this->producto_id,
            'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->format('d-m-yy'),
            'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', $this->updated_at)->format('d-m-yy'),
           // 'productos' => $this->producto
        ];
    }
}
