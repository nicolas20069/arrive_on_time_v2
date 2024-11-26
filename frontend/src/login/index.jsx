import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "./login.css";

export function Login() {
  return (
    <main className="main">
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
            /* value={rolName}
              onChange={(e) => setRolName(e.target.value)} */
          />
        </label>

        <label className="label-form" htmlFor="contraseña">
          Contraseña
          <InputText
            id="contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
            /* value={rolName}
              onChange={(e) => setRolName(e.target.value)} */
          />
        </label>

        <Button
          type="submit"
          label="Iniciar sesion"
          size="small"
          className="primary-button login-button"
        />
      </form>
    </main>
  );
}
