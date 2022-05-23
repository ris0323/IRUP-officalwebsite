import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

// import YouTube from 'vue3-youtube'.component('YouTube', YouTube)

// loading component globalize
import LoadingComponent from "@/components/LoadingComponent.vue";

// import snackbar
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";

createApp(App).use(store).use(router).use(SnackbarService).component("vue3-snackbar", Vue3Snackbar).component('LoadingComponent', LoadingComponent).mount('#app')
