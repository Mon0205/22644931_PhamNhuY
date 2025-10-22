import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { saveEditedImage } from '../utils/Storage';

export default function EditScreen({ route, navigation }) {
  const { uri } = route.params;
  const [editedUri, setEditedUri] = useState(uri);

  const rotateImage = async () => {
    const result = await ImageManipulator.manipulateAsync(editedUri, [{ rotate: 90 }], { compress: 1 });
    setEditedUri(result.uri);
  };

  const flipImage = async () => {
    const result = await ImageManipulator.manipulateAsync(
      editedUri,
      [{ flip: ImageManipulator.FlipType.Horizontal }],
      { compress: 1 }
    );
    setEditedUri(result.uri);
  };

  const saveImage = async () => {
    try {
      await saveEditedImage(editedUri);
      Alert.alert('✅ Đã lưu ảnh!', 'Ảnh đã được thêm vào thư viện.');
      navigation.navigate('Thư viện');
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Lỗi', 'Không thể lưu ảnh.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedUri }} style={styles.image} />
      <Button title="Xoay 90°" onPress={rotateImage} />
      <Button title="Lật ngang" onPress={flipImage} />
      <Button title="Lưu ảnh" onPress={saveImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', gap: 10, marginTop: 20 },
  image: { width: 300, height: 300, borderRadius: 10, marginBottom: 10 },
});
