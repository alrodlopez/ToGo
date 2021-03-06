<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TipoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch($this->method()){
            case 'PUT':
                $rules = [
                    'nombre' => 'required|string|unique:tipos,id,:id',
                ];
            break;
            default:
                $rules = [
                    'nombre' => 'required|string|unique:tipos,nombre',
                ];
            break;
        }

        return $rules;
    }
}
