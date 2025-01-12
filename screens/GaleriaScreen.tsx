import { useState } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GaleriaScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://4kwallpapers.com/images/walls/thumbs_3t/17473.jpg" }}
      style={styles.img}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Galería</Text>
        <Text style={styles.subtitle}>Selecciona una imagen de tu galería</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Abrir galería</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1, // Esto asegura que la imagen de fondo ocupe toda la pantalla
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgba(249, 249, 249, 0.7)', // Esto hace que el fondo sea ligeramente transparente
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
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
  imageContainer: {
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
  },
});
