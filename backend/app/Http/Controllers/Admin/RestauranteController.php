<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RestauranteRequest;
use App\Http\Requests\UsuarioRequest;
use App\Http\Resources\RestauranteResource;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Http\Request;
use App\Models\Restaurante;
use Illuminate\Http\Response;
use App\Traits\UploadImage;
use App\User;
use DB;
use Illuminate\Support\Facades\Validator;

class RestauranteController extends Controller
{
    use UploadImage;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $nombre = $request->input('nombre');
        $restaurantes = Restaurante::buscar($nombre)->orderBy('id', 'desc')->get();
        return RestauranteResource::collection($restaurantes);
    }


    public function restaurante()
    {

        $restaurante = Restaurante::get()->last();
        return new RestauranteResource($restaurante);
    }
    public function cambiarEstado(RestauranteRequest $request, $id=0)
    {
        $restaurante = Restaurante::findOrFail((int) $id);
        if($request->input('estado') == 0)
        {
            $mensaje = 'El restaurante esta cerrado';
            $restaurante->estado = false;
        }
        else
        {
            $mensaje = 'El restaurante esta abierto';
            $restaurante->estado = true;
        }

        $restaurante->save();

        return response()->json([
            'mensaje' => $mensaje,
            'repartidor' => new RestauranteResource($restaurante)
        ], Response::HTTP_OK);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RestauranteRequest $request)
    {
        try {
            DB::beginTransaction();

            $restaurante = new Restaurante();

            $restaurante->nombre = $request->input('nombre');
            $restaurante->direccion = $request->input('direccion');
            $restaurante->telefono = $request->input('telefono');
            $restaurante->descripcion = $request->input('descripcion');
            $restaurante->email = $request->input('email');
           // $restaurante->direccion = $request->input('direccion');
            $restaurante->ubicacion = new Point($request->ubicacion['latitude'],$request->ubicacion['longitude']);

            if($request->hasFile('logo') == true){
                $imagen = $this->subirImagen($request->file('logo'), false, 'restaurantes');
            }

            $restaurante->logo = $imagen;
            $restaurante->save();

            $categorias = $request->categorias ? $request->categorias : [];
            $restaurante->categorias()->sync($categorias);

            $inicio = substr($request->input('nameUser'),0,2);
            $final = substr($request->input('apellidosUser'),0,2);

            $password = $inicio . "togo" .$final;
            $usuario = new User();

            $usuario->name = $request->input('nameUser');
            $usuario->apellidos = $request->input('apellidosUser');
            $usuario->telefono = $request->input('telefonoUser');
            $usuario->email = $request->input('emailUser');
            $usuario->password = strtolower($password);
            $usuario->restaurante_id = $restaurante->id;
            

            $usuario->save();
            $usuario->assignRole('AdminRestaurante');
            $usuario->givePermissionTo('Restaurante');
            DB::commit();

            return response()->json([
                'mensaje' => 'Los datos se guardaron exitosamente',
                'restaurante' => new RestauranteResource($restaurante)
            ], Response::HTTP_CREATED);

        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollBack();

            response()->json([
                'mensaje' => 'Error al guardar, consulte al Administrador' . $e,
            ], Response::HTTP_FORBIDDEN);
        }

        //return response()->json($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id=0)
    {
        $restaurante = Restaurante::findOrFail((int)$id);
        return new RestauranteResource($restaurante);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RestauranteRequest $request, $id=0)
    {
        try {
            DB::beginTransaction();

            $restaurante = Restaurante::findOrFail((int) $id);

            $restaurante->nombre = $request->input('nombre');
            $restaurante->direccion = $request->input('direccion');
            $restaurante->telefono = $request->input('telefono');
            $restaurante->descripcion = $request->input('descripcion');
            $restaurante->email = $request->input('email');
            $restaurante->direccion = $request->input('direccion');
            $restaurante->ubicacion = new Point($request->ubicacion['latitude'],$request->ubicacion['longitude']);

            if($request->hasFile('logo') == true){
                $imagen = $this->subirImagen($request->file('logo'), $restaurante->logo, 'restaurantes');
            }
            else{
                $imagen = $restaurante->logo;
            }

            $restaurante->logo = $imagen;
            $restaurante->save();

            $categorias = $request->categorias ? $request->categorias : [];
            $restaurante->categorias()->sync($categorias);

            DB::commit();

            return response()->json([
                'mensaje' => 'Los datos se actualizaron con ??xito',
                'restaurante' => new RestauranteResource($restaurante)
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id=0)
    {
        $restaurante = Restaurante::findOrFail((int) $id);
        $restaurante->delete();

        return response()->json([
            'mensaje' => 'Eliminado con ??xito',
        ], Response::HTTP_OK);
    }
}
