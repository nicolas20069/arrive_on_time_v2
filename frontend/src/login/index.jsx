import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { login } from "./api/login.js";

import "./login.css";

export function Login() {
  const toast = useRef(null);

  const [cedula, setCedula] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const showSuccess = ({ detail }) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail,
      life: 3000,
    });
  };

  const showWarn = ({ detail }) => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail,
      life: 3000,
    });
  };

  const showError = ({ detail }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
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
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    try {
      const [err, user] = await login({
        cedula,
        contraseña,
      });

      if (user) {
        showSuccess({ detail: "Sesion Iniciada" });
        localStorage.setItem("user", JSON.stringify(user.user));

        setTimeout(() => {
          if (user.user.rol_id === 1) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/user";
          }
        }, 1000);
      } else {
        showError({ detail: err });
      }
    } catch (error) {
      showError({
        detail: error.message,
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
          label="Iniciar sesion"
          size="small"
          className="primary-button login-button"
          onClick={handleLogin}
        />
      </form>
    </main>
  );
}
