import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setCorreo("");
                setContrasenia("");
                navigation.navigate("Welcome");
            })
            .catch((error) => {
                const errorCode = error.code;
                let titulo = "";
                let mensaje = "";

                switch (errorCode) {
                    case 'auth/invalid-credential':
                        titulo = "Credenciales inválidas";
                        mensaje = "Las credenciales son incorrectas, verificar";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Error en correo";
                        mensaje = "Verificar la dirección de correo electrónico";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Verificar correo y contraseña";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <ImageBackground
            source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/1326.jpg" }}
            style={styles.img}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

                <TextInput
                    placeholder="Ingresar correo"
                    style={styles.input}
                    value={correo}
                    onChangeText={(texto) => setCorreo(texto)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    placeholder="Ingresar contraseña"
                    style={styles.input}
                    value={contrasenia}
                    onChangeText={(texto) => setContrasenia(texto)}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.link}>Crear una cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Restablecer')}>
                    <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    img: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        fontSize: 16,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    button: {
        backgroundColor: 'purple',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#007BFF',
        fontSize: 14,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});