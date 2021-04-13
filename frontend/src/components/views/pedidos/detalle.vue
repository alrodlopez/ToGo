<template>
    <div>
        <div class="invoice">
            <!-- begin invoice-company -->
            <!-- <div class="invoice-company">
                Detalle Pedido
            </div> -->
            <!-- end invoice-company -->
            <!-- begin invoice-header -->
            <div class="invoice-header">
                <div class="invoice-from">
                    <address class="m-t-5 m-b-5">
                        <strong class="text-inverse">{{ cliente.nombre }} {{ cliente.apellidos }}</strong><br>
                        Direccion<br>
                        {{ orden.direccion }}<br>
                        Telefono: (+591) {{ cliente.telefono }}<br>
                    </address>
                </div>
                <div class="invoice-date">
                    <small>Fecha Pedido</small>
                    <div class="date text-inverse m-t-5">{{ orden.fecha }}</div>
                    <!-- <div class="invoice-detail">
                        #0000123DSS<br>
                        Services Product
                    </div> -->
                </div>
            </div>
            <!-- end invoice-header -->
            <!-- begin invoice-content -->
            <div class="invoice-content">
                <!-- begin table-responsive -->
                <div class="table-responsive">
                    <table class="table table-invoice">
                        <thead>
                            <tr>
                                <th>DESCRIPCION PRODUCTO</th>
                                <th class="text-center" width="10%">PRECIO</th>
                                <th class="text-center" width="10%">CANTIDAD</th>
                                <th class="text-right" width="20%">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(detalle, index) in detalles" :key="index">
                                <td>
                                    <span class="text-inverse">{{ detalle.nombre }}</span><br>
                                    <small v-for="(descripcion, index) in descripcionFilter(detalle.id)" :key="index">-{{ descripcion.nombre }}</small>
                                </td>
                                <td class="text-center">{{ detalle.precio }}</td>
                                <td class="text-center">{{ detalle.pivot.cantidad }}</td>
                                <td class="text-right">{{ detalle.precio * detalle.pivot.cantidad }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- end table-responsive -->
                <!-- begin invoice-price -->
                <div class="invoice-price">
                    <div class="invoice-price-left">
                        &nbsp;
                    </div>
                    <div class="invoice-price-right">
                        <small>TOTAL</small> <span class="f-w-600">Bs. {{ total }}</span>
                    </div>
                </div>
                <!-- end invoice-price -->
            </div>
            <!-- end invoice-content -->
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'DetallePedido',
    props: {
        idPedido: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            orden: [],
            detalles: [],
            cliente: [],
            descripcion: []
        }
    },
    computed: {
        ...mapGetters('pedidos', ['pedido']),
        total() {
            return this.detalles.reduce((total, item) => {
                return total + item.pivot.cantidad * item.precio;
            }, 0)
        }
    },
    methods: {
        ...mapActions('pedidos', ['getPedido']),
        detallePedido(){
            this.getPedido(this.idPedido).then( response => {
                this.orden = response.data.data.orden;
                this.detalles = response.data.data.detalle;
                this.cliente = response.data.data.cliente;
                this.descripcion = response.data.data.descripcion;
            }).catch( error => {
                console.log(error);
            })
        },
        descripcionFilter(id){
            return this.descripcion.filter(item => item.producto_id === id); 
        },
        },
    mounted() {
        this.detallePedido();
    },
}
</script>
