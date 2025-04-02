import "./login.css";
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { login } from "./api/login.js";
import { SEVERITY_TOAST, SUMMARY_TOAST } from "./constants/toast-config.js";

export function Login() {
  const toast = useRef(null);

  const [cedula, setCedula] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const showToast = ({ detail, severity, summary }) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const toggleMostrarContraseña = (e) => {
    e.preventDefault();
    setMostrarContraseña(!mostrarContraseña);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!cedula || !contraseña) {
      showToast({
        detail: "Porfavor llena todos los campos",
        severity: SEVERITY_TOAST.warn,
        summary: SUMMARY_TOAST.warn,
      });
      return;
    }

    try {
      const [error, data] = await login({
        cedula,
        contraseña,
      });

      if (data) {
        const { user } = data;
        localStorage.setItem("user", JSON.stringify(user));

        if (user.rol_id === 1) {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      } else {
        showToast({
          detail: error,
          severity: SEVERITY_TOAST.error,
          summary: SUMMARY_TOAST.error,
        });
      }
    } catch (error) {
      showToast({
        detail: error.message,
        severity: SEVERITY_TOAST.error,
        summary: SUMMARY_TOAST.error,
      });
    }
  };

  return (
    <main className="main">
      <Toast ref={toast} />
      <header className="login-header">
        <img
          className="login-img"
          src="/favicon.svg"
          alt="Logo de arrive on time"
        />

        <div className="login-hero">
          <h1 className="login-title">Iniciar sesión</h1>
          <h2 className="login-subtitle">Arrive On Time</h2>
        </div>
      </header>

      <form className="login-form">
        <label className="label-form" htmlFor="cedula">
          Cedula
          <InputText
            id="cedula"
            type="text"
            placeholder="Ingresa tu cedula"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </label>

        <label className="label-form" htmlFor="contraseña">
          Contraseña
          <div className="password-input">
            <InputText
              id="contraseña"
              type={mostrarContraseña ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              required
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />

            <button
              className="primary-button btn-show-password"
              onClick={toggleMostrarContraseña}
            >
              <img
                src={`/login/${mostrarContraseña ? "eye.svg" : "eye-off.svg"}`}
                alt=""
              />
            </button>
          </div>
        </label>

        <Button
          type="submit"
          label="Iniciar Sesión"
          icon="custom-login-icon"
          iconPos="left"
          size="small"
          className="primary-button login-button"
          onClick={handleLogin}
        />

        <div class="separator">
          <div class="line"/>
          <span>o</span>
          <div class="line"/>
        </div>

        <Button
          type="button"
          label="Iniciar sesión con Google"
          icon="custom-google-icon"
          size="small"
          iconPos="left"
          className="primary-button login-button"
          style={{ marginTop: "0" }}
        />

      </form>
    </main>
  );
}
