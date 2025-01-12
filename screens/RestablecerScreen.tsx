import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert, ImageBackground } from 'react-native';
import React, { useState } from 'react';
// FIREBASE
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RestablecerScreen() {
    const [correo, setcorreo] = useState("");

    function restablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                // Password reset email sent!
                // ..
                Alert.alert("Mensaje", "Se ha enviado un mensaje a su correo electrónico")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorCode, errorMessage)
                // ..
            });
    }
    return (
        <ImageBackground
            source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/3323.jpg" }}
            style={styles.img}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Restablecer Contraseña</Text>
                <Text style={styles.subtitle}>
                    Ingresa tu correo electrónico para recibir un enlace de restablecimiento.
                </Text>

                <TextInput
                    placeholder="Correo electrónico"
                    style={styles.input}
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={(texto) => setcorreo(texto)}
                />

                <TouchableOpacity style={styles.button} onPress={restablecer}>
                    <Text style={styles.buttonText}>Enviar</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        fontSize: 18,
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "purple",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
