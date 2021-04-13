<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Producto</th>
                    <th class="center">Cantidad Vendida</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-active">
                    <td>1</td>
                    <td>{{productos[0].Producto}}</td>
                    <td class="center">{{productos[0].Cantidad}}</td>
                </tr>
                <tr class="table-info">
                    <td>2</td>
                    <td>{{productos[1].Producto}}</td>
                    <td class="center">{{productos[1].Cantidad}}</td>
                </tr>
                <tr class="table-success">
                    <td>3</td>
                    <td>{{productos[2].Producto}}</td>
                    <td class="center">{{productos[2].Cantidad}}</td>
                </tr>
                <tr class="table-warning">
                    <td>4</td>
                    <td>{{productos[3].Producto}}</td>
                    <td class="center">{{productos[3].Cantidad}}</td>
                </tr>
                <tr class="table-danger">
                    <td>5</td>
                    <td>{{productos[4].Producto}}</td>
                    <td class="center">{{productos[4].Cantidad}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
export default {
    name:'MasVendidos',
    props:['productos']
}
</script>

<style>
.center{
    text-align: center;
}
</style>
