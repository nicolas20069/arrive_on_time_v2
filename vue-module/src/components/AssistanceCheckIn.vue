<template>
    <div class="assistance-module">
        <!-- Título principal del módulo -->
        <h2>Registro de Asistencia</h2>
        <p>Por favor, ingresa tu código de empleado y selecciona tu acción.</p>

        <!-- Campo para ingresar el ID del empleado -->
        <input 
            v-model="employeeId" 
            type="number" 
            placeholder="Código de Empleado" 
            :disabled="loading" 
            @blur="getHistory" 
        />

        <!-- Botones para registrar entrada o salida -->
        <div class="actions">
            <!-- Botón de ENTRADA -->
            <!-- Se desactiva si no hay employeeId o está cargando -->
            <button 
                @click="recordAssistance('entrada')" 
                :disabled="!employeeId || loading" 
                class="btn-check-in"
            >
                <!-- Muestra texto dinámico dependiendo del estado -->
                {{ loading && actionType === 'entrada' ? 'Registrando...' : 'Marcar ENTRADA' }}
            </button>

            <!-- Botón de SALIDA -->
            <button 
                @click="recordAssistance('salida')" 
                :disabled="!employeeId || loading" 
                class="btn-check-out"
            >
                {{ loading && actionType === 'salida' ? 'Registrando...' : 'Marcar SALIDA' }}
            </button>
        </div>

        <!-- Mensaje de estado: éxito o error -->
        <p v-if="message" :class="['status-message', statusType]">
            {{ message }}
        </p>

        <!-- Sección de historial -->
        <!-- Solo se muestra si hay registros en 'history' -->
        <div v-if="history.length > 0" class="history-section">
            <!-- Estado actual del empleado (Entrada o Salida) -->
            <h3>
                Estado Actual: 
                <span :class="currentStatus === 'Entrada' ? 'status-in' : 'status-out'">
                    {{ currentStatus }}
                </span>
            </h3>
        </div>
    </div>
</template>

<script setup>
// Importamos los composables de Vue 3
import { ref, watch } from 'vue';
// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// URL base del backend, tomada desde las variables de entorno
const API_URL = import.meta.env.VITE_API_BASE_URL;

// ======================
// Variables reactivas
// ======================
const employeeId = ref(null);      // ID del empleado
const loading = ref(false);        // Estado de carga para evitar acciones múltiples
const message = ref('');           // Mensaje de estado (éxito o error)
const statusType = ref('');        // Tipo de mensaje ('success' o 'error')
const actionType = ref('');        // Acción actual ('entrada' o 'salida')
const history = ref([]);           // Historial de asistencias
const currentStatus = ref('desconocido'); // Estado actual del empleado


// ======================
// Función: Registrar Asistencia
// ======================
const recordAssistance = async (type) => {
    // Validación: si no hay ID, mostramos error
    if (!employeeId.value) {
        message.value = 'Por favor, ingresa tu código de empleado.';
        statusType.value = 'error';
        return;
    }

    // Activamos el estado de carga
    loading.value = true;
    actionType.value = type; // Guardamos la acción actual
    message.value = '';

    // Datos a enviar al backend
    const assistanceData = { 
        employeeId: employeeId.value, 
        type: type 
    };

    try {
        // Petición POST al backend para registrar la asistencia
        const response = await axios.post(`${API_URL}/public/attendances/record`, assistanceData);

        // Si la respuesta es exitosa, mostramos el mensaje y actualizamos historial
        if (response.data.success) {
            message.value = response.data.message;
            statusType.value = 'success';
            //..
            employeeId.value = null; // Limpiamos el campo
        }
    } catch (error) {
        // Captura de errores del servidor o de conexión
        console.error('Error al registrar la asistencia:', error);

        // Mostramos mensaje adecuado al usuario
        if (error.response && error.response.data && error.response.data.message) {
            message.value = `ERROR: ${error.response.data.message}`;
        } else {
            message.value = 'Error de conexión. Intenta de nuevo.';
        }
        statusType.value = 'error';
    } finally {
        // Finalizamos el estado de carga
        loading.value = false;
        actionType.value = '';
    }
};
</script>


<style scoped>
.assistance-module {
    max-width: 450px;
    margin: 50px auto;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    font-family: sans-serif;
}

input {
    width: 90%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.actions button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-check-in { background-color: #4CAF50; color: white; }
.btn-check-out { background-color: #f44336; color: white; }
.actions button:disabled { background-color: #cccccc; cursor: not-allowed; }

.status-message {
    padding: 10px;
    margin-top: 20px;
    border-radius: 4px;
}

.success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

.status-in { font-weight: bold; color: #155724; }
.status-out { font-weight: bold; color: #721c24; }
</style>