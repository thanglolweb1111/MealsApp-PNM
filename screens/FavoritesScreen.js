import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { CATEGORIES } from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 

const FavoritesScreen = () => {
  const { authState } = useContext(AuthContext);
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const isFocused = useIsFocused(); 
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const favoriteIds = JSON.parse(storedFavorites);
          if (authState.isLoggedIn) {
            const meals = CATEGORIES.filter(category => favoriteIds.includes(category.id));
            setFavoriteMeals(meals);
          } else {
            Alert.alert('Chưa đăng nhập', 'Vui lòng đăng nhập để xem danh sách yêu thích.');
            setFavoriteMeals([]); 
          }
        } else {
          setFavoriteMeals([]);
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
        Alert.alert('Error', 'Failed to load favorites.');
      }
    };

    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused, authState.isLoggedIn]); 

  const renderMealItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
      <View style={styles.textContainer}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealTitle}>{item.title}</Text>
        <Text style={styles.mealPrice}>{item.Price}</Text>
        <Text style={styles.mealDescription}>{item.Describe}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMeals}
        renderItem={renderMealItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bạn chưa có món ăn yêu thích nào!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9', 
  },
  mealItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, 
  },
  mealImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mealName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333', 
  },
  mealTitle: {
    fontSize: 18,
    color: '#555', 
  },
  mealPrice: {
    fontSize: 16,
    color: '#27ae60', 
    marginVertical: 5,
  },
  mealDescription: {
    fontSize: 14,
    color: '#777', 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default FavoritesScreen;
