import crypto from "crypto";

const SECRET_KEY = Buffer.from("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", "hex");
const ALGORITHM = "aes-256-cbc";

// Funcion para encriptar
export const encryptImage = (buffer) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
};

// Función para desencriptar
export const decryptImage = (encryptedBuffer, iv) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
  return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
};
