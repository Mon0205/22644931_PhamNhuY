import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveEditedImage = async (uri) => {
  try {
    const existing = await AsyncStorage.getItem('edited_images');
    const images = existing ? JSON.parse(existing) : [];
    images.push(uri);
    await AsyncStorage.setItem('edited_images', JSON.stringify(images));
  } catch (err) {
    console.error('Lỗi lưu ảnh:', err);
  }
};

export const getEditedImages = async () => {
  try {
    const data = await AsyncStorage.getItem('edited_images');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Lỗi đọc ảnh:', err);
    return [];
  }
};

export const clearEditedImages = async () => {
  await AsyncStorage.removeItem('edited_images');
};
