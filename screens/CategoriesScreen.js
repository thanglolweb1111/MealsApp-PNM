import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { CATEGORIES } from '../data/data';

const CategoriesScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('All'); // Mặc định là 'All'

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null, 
      headerStyle: {
        height: 0, 
      },
    });
  }, [navigation]);
  
  const filteredCategories = selectedCountry === 'All' 
    ? CATEGORIES 
    : CATEGORIES.filter((item) => item.title === selectedCountry);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('MealsOverview', { categoryId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* Menu hàng đầu chứa cả tiêu đề và picker chọn quốc gia */}
      <View style={styles.topMenu}>
        <Text style={styles.categoryLabel}>Category:</Text>
        <Picker
          selectedValue={selectedCountry}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
        >
          <Picker.Item label="Tất cả" value="All" />
          <Picker.Item label="Việt Nam" value="Việt Nam" />
          <Picker.Item label="Trung Quốc" value="Trung Quốc" />
          <Picker.Item label="Châu Á" value="Châu Á" />
          <Picker.Item label="Phương Tây" value="Phương Tây" />
        </Picker>
      </View>
      {/* Hiển thị danh sách món ăn */}
      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  topMenu: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 20, 
    paddingHorizontal: 10, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150, 
    backgroundColor: '#f0f0f0',
  },
  categoryItem: {
    flex: 1,
    margin: 15,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#c0e18db8',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryImage: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
  },
});

export default CategoriesScreen;
