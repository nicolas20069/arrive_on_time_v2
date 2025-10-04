import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios'; // Importamos Axios

// 1. Configuración de la URL base para Axios (Opcional, pero útil)
// Esto permite que en los componentes solo uses '/record'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// 2. Crear y montar la aplicación
const app = createApp(App);

app.mount('#app');