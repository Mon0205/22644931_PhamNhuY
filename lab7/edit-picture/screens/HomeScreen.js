import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation }) {
  const [image, setImage] = useState(null);

  // Reset ảnh mỗi khi quay lại màn hình chính
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => setImage(null));
    return unsubscribe;
  }, [navigation]);

  // Mở thư viện ảnh để chọn
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />

      {/* Nút xem thư viện ảnh đã chỉnh sửa (luôn hiển thị) */}
      <Button
        title="Xem ảnh đã chỉnh sửa"
        color="#1E90FF"
        onPress={() => navigation.navigate('Thư viện')}
      />

      {/* Nếu người dùng đã chọn ảnh thì hiện thêm ảnh + nút chỉnh sửa */}
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button
            title="Chỉnh sửa ảnh"
            color="#32CD32"
            onPress={() => navigation.navigate('Chỉnh sửa ảnh', { uri: image })}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
  },
});
