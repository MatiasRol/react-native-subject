import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede exceder 50 caracteres")
  .regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    "Solo se permiten letras y espacios"
  );

export const emailSchema = z
  .string()
  .min(1, "El email es requerido")
  .email("Por favor ingresa un email válido")
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial");

export const phoneSchema = z
  .string()
  .min(10, "El teléfono debe tener al menos 10 dígitos")
  .regex(/^[0-9+\s()-]+$/, "Formato de teléfono inválido");

export const ageSchema = z
  .string()
  .regex(/^[0-9]+$/, "Solo se permiten números")
  .refine((val) => {
    const num = parseInt(val);
    return num >= 18 && num <= 120;
  }, "Debes ser mayor de 18 años");

export const createConfirmPasswordSchema = (password: string) => {
  return z
    .string()
    .min(1, "Por favor confirma tu contraseña")
    .refine((val) => val === password, "Las contraseñas no coinciden");
};

export const usernameSchema = z
  .string()
  .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
  .max(20, "El nombre de usuario no puede exceder 20 caracteres")
  .regex(
    /^[a-z][a-z0-9_]*$/,
    "Solo minúsculas, números y guiones bajos. Debe comenzar con letra"
  );