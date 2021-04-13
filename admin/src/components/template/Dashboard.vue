<template>
    <div id="layout-wrapper">
        <header-component></header-component>
        <sidebar-component></sidebar-component>
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <router-view/>
                </div>
            </div>
            <!-- <footer-component></footer-component> -->
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Header from '../elements/Header'
import SideBar from '../elements/Sidebar'
import Footer from '../elements/Footer'
export default {
    name: 'Dashboard',
    components: {
        'header-component': Header,
        'sidebar-component': SideBar,
        'footer-component': Footer
    },
}
</script>
