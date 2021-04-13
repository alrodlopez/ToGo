<template>
    <div>
        <div id="page-container" class="fade">
           <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'Login',
    beforeCreate() {
    document.body.removeAttribute('class');
    },
    beforeDestroy(){
        const recaptchaScripts = document.querySelectorAll('script');
        for (let i = 0; i < recaptchaScripts.length; i += 1) {
        recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i]);
        }
    },
    mounted() {

        Vue.loadScript('../../../static/assets/js/app.min.js')
        Vue.loadScript('../../../static/assets/js/theme/default.min.js')

    },
}
</script>
