import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CATEGORIES } from '../data/data';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const MealsOverviewScreen = () => {
  const route = useRoute();
  const { categoryId } = route.params;
  const { authState } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;
  const userId = authState.user?.id;

  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };

    const loadCategory = () => {
      const category = CATEGORIES.find((category) => category.id === categoryId);
      setSelectedCategory(category);
      console.log(favorites);
    };

    loadFavorites();
    loadCategory();
  }, [categoryId]);

  const handleFavoritePress = async () => {
    if (!isLoggedIn) {
      Alert.alert('Chưa đăng nhập', 'Bạn cần đăng nhập để thêm vào danh sách yêu thích.');
      return;
    }

    let updatedFavorites;
    if (favorites.includes(categoryId)) {
      // Remove 
      updatedFavorites = favorites.filter(id => id !== categoryId);
      console.log(favorites + " " + "~1");
    } else {
      // Add 
      updatedFavorites = [...favorites, categoryId];
      console.log(favorites);
    }

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      console.log(favorites + " " + "~2");
    } catch (error) {
      console.error('Failed to save favorites:', error);

    }
  };

  if (!selectedCategory) {
    return (
      <View style={styles.screen}>
        <Text>Danh mục không tồn tại!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.mealItem}>
        <Image source={{ uri: selectedCategory.imageUrl }} style={styles.mealImage} />
        <View style={styles.textContainer}>
          <Text style={styles.mealName}>Tên Món: {selectedCategory.name}</Text>
          <Text style={styles.mealTitle}>Quốc Gia: {selectedCategory.title}</Text>
          <Text style={styles.mealPrice}>Giá: {selectedCategory.Price}</Text>
          <Text style={styles.mealDescription}>Mô Tả: {selectedCategory.Describe}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Icon
            name={favorites.includes(categoryId) ? 'heart' : 'heart-outline'}
            size={30}
            color={favorites.includes(categoryId) ? 'red' : 'grey'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  mealItem: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  mealImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    marginVertical: 10,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealTitle: {
    fontSize: 16,
    color: 'gray',
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  favoriteButton: {
    marginTop: 10,
  },
});

export default MealsOverviewScreen;
