<template>
    <div id="app">
        <div id="page-container" class="page-container fade page-sidebar-fixed page-header-fixed show">
            <header-component></header-component>
            <sidebar-component></sidebar-component>
            <div id="content" class="content">
                <router-view></router-view>
            </div>
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
