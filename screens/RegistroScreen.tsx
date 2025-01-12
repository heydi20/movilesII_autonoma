import { Button, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert("Registro exitoso", "Bienvenido");
                setCorreo("");
                setContrasenia("");
                navigation.navigate('Welcome');
            })
            .catch((error) => {
                const errorCode = error.code;
                let mensaje = "";

                switch (errorCode) {
                    case 'auth/invalid-email':
                        mensaje = "El correo electrónico no es válido.";
                        break;
                    case 'auth/weak-password':
                        mensaje = "La contraseña es demasiado débil.";
                        break;
                    case 'auth/email-already-in-use':
                        mensaje = "El correo ya está registrado.";
                        break;
                    default:
                        mensaje = "Ha ocurrido un error. Inténtalo de nuevo.";
                }

                Alert.alert("Error en registro", mensaje);
            });
    }

    return (
        <ImageBackground
            source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/3553.jpg" }}
            style={styles.img}
        >
            <View style={styles.container}>
                <Text style={styles.title}>REGISTRO</Text>

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
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={registro}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    img:{
        flex:1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    input: {
        fontSize: 16,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 15,
        borderColor: 'black',
        borderWidth: 1,
        width: "85%",
        elevation: 2, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    button: {
        backgroundColor: 'purple',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
