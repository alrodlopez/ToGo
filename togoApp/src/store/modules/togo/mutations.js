export function setDriver(state, valor){
  state.driver = valor
}

export function setUbicacion(state, ubicacion){
  state.ubicacion.latitud = ubicacion.latitude
  state.ubicacion.longitud = ubicacion.longitude
}
