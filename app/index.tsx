import TextField from "@/components/TextField";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ageSchema,
  createConfirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  phoneSchema
} from "../lib/schemas/authSchemas";


export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const confirmPasswordSchema = createConfirmPasswordSchema(password);

  
  const validateAll = () => {
    try {
      nameSchema.parse(name);
      emailSchema.parse(email);
      passwordSchema.parse(password);
      confirmPasswordSchema.parse(confirmPassword);
      phoneSchema.parse(phone);
      ageSchema.parse(age);
      return true;
    } catch {
      return false;
    }
  };

 
  const handleSubmit = () => {
    if (validateAll()) {
      // Formulario válido - Mostrar éxito
      Alert.alert(
        "✅ Registro exitoso",
        `Bienvenido ${name}!\n\nEmail: ${email}\nTeléfono: ${phone}`,
        [{ text: "OK" }]
      );
      
      console.log("Datos del usuario:", { name, email, password, phone, age });
    } else {
      Alert.alert(
        "❌ Error en el formulario",
        "Por favor completa todos los campos correctamente",
        [{ text: "OK" }]
      );
    }
  };

  const isFormValid = validateAll();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>
            Completa el formulario para registrarte
          </Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="Nombre completo"
            placeholder="Juan Pérez"
            value={name}
            onChangeText={setName}
            schema={nameSchema}
            helperText="Tu nombre y apellido"
            leftIcon={<Text style={styles.icon}>👤</Text>}
            validateOnChange
            autoCapitalize="words"
          />

          <TextField
            label="Correo electrónico"
            placeholder="tu@email.com"
            value={email}
            onChangeText={setEmail}
            schema={emailSchema}
            helperText="Usaremos este email para contactarte"
            leftIcon={<Text style={styles.icon}>📧</Text>}
            keyboardType="email-address"
            autoCapitalize="none"
            validateOnChange
          />

          <TextField
            label="Teléfono"
            placeholder="+593 99 123 4567"
            value={phone}
            onChangeText={setPhone}
            schema={phoneSchema}
            helperText="Incluye el código de país"
            leftIcon={<Text style={styles.icon}>📱</Text>}
            keyboardType="phone-pad"
          />

          <TextField
            label="Edad"
            placeholder="25"
            value={age}
            onChangeText={setAge}
            schema={ageSchema}
            helperText="Debes ser mayor de 18 años"
            leftIcon={<Text style={styles.icon}>🎂</Text>}
            keyboardType="numeric"
            maxLength={3}
          />

          <TextField
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            schema={passwordSchema}
            helperText="Mínimo 8 caracteres, incluye mayúsculas, números y símbolos"
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            secureTextEntry
            validateOnChange
          />

          <TextField
            label="Confirmar contraseña"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            schema={confirmPasswordSchema}
            helperText="Ingresa la misma contraseña"
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            secureTextEntry
            validateOnChange
          />

          <Pressable
            style={[
              styles.button,
              !isFormValid && styles.buttonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>
              Registrarse
            </Text>
          </Pressable>

          <Text style={styles.footerText}>
            ¿Ya tienes cuenta?{" "}
            <Text style={styles.link}>Inicia sesión</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  form: {
    gap: 4,
  },
  icon: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#d1d5db",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#6b7280",
    fontSize: 14,
  },
  link: {
    color: "#3b82f6",
    fontWeight: "600",
  },
});