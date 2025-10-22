import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getEditedImages, clearEditedImages } from '../utils/Storage';

export default function GalleryScreen({ navigation }) {
  const [editedImages, setEditedImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imgs = await getEditedImages();
      setEditedImages(imgs || []);
    };
    const unsubscribe = navigation.addListener('focus', loadImages);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      

      <FlatList
        data={editedImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ alignItems: 'center', marginTop: 10 }}
      />
      <Button title="Về trang chủ" onPress={() => navigation.navigate('Trang chủ')} />
      <Button title="Xóa danh sách ảnh" color="red" onPress={async () => {
        await clearEditedImages();
        setEditedImages([]);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: 20 },
  image: { width: 250, height: 250, borderRadius: 10, marginVertical: 10 },
});
