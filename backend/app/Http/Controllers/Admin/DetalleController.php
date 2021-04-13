<?php

namespace App\Http\Controllers\Admin;

use App\Models\Detalle;
use Illuminate\Http\Request;
use App\Http\Resources\DetalleResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\DetalleRequest;
use Illuminate\Http\Response;
use DB;

class DetalleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $detalles = Detalle::orderBy('id', 'desc')->get();
        return DetalleResource::collection($detalles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $detalle = new Detalle();
            $detalle->nombre = $request->input('nombre');
            $detalle->producto_id = $request->input('producto_id');
            $detalle->save();

            DB::commit();

            return response()->json([
                'mensaje' => 'El Detalle se guardo exitosamente',
                'detalle' => new DetalleResource($detalle)
            ], Response::HTTP_CREATED);

        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();

            response()->json([
                'mensaje' => 'Error al guardar, consulte al Administrador' . $e,
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Detalle  $detalle
     * @return \Illuminate\Http\Response
     */
    public function show($id=0)
    {
        $detalle = Detalle::findOrFail((int)$id);
        return new DetalleResource($detalle);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Detalle  $detalle
     * @return \Illuminate\Http\Response
     */
    public function edit(Detalle $detalle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Detalle  $detalle
     * @return \Illuminate\Http\Response
     */
    public function update(DetalleRequest $request, $id=0)
    {
        try {
            DB::beginTransaction();

            $detalle = Detalle::findOrFail((int) $id);
            $detalle->nombre = $request->input('nombre');
            $detalle->save();

            DB::commit();

            return response()->json([
                'mensaje' => 'El detalle se actualizo con éxito',
                'detalle' => new DetalleResource($detalle)
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();

            response()->json([
                'mensaje' => 'Error al actualizar, consulte al Administrador' . $e,
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Detalle  $detalle
     * @return \Illuminate\Http\Response
     */
    public function destroy($id=0)
    {
        $detalle = Detalle::findOrFail((int) $id);
        $detalle->delete();

        return response()->json([
            'mensaje' => 'Eliminado con éxito',
        ], Response::HTTP_OK);
    }
}
