import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, IconButton, FAB, Searchbar } from 'react-native-paper';

import { RecipeCard } from '../components';
import { colors, fonts, routes } from '../config';
import { useGlobalContext } from '../store';

export default function RecipeList({ navigation }) {
  const [search, setSearch] = React.useState('');
  const [sortType, setSortType] = React.useState('');

  const { activeFont, darkMode, fontSize, recipes, recipeLoading } = useGlobalContext();

  const filteredRecipes = React.useMemo(() => {
    let data = [];
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) data = recipes;
    else data = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchValue));

    if (sortType !== '') {
      if (sortType === 'asc') {
        data = data.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          return 0;
        });
      } else {
        data = data.sort((a, b) => {
          if (b.title > a.title) return 1;
          else if (b.title < a.title) return -1;
          return 0;
        });
      }
    }
    return data;
  }, [search, sortType, recipes]);

  return (
    <View
      className="gap-y-4 px-6 py-4"
      style={[styles.container, { backgroundColor: darkMode ? colors.dark[900] : undefined }]}
    >
      <View className="mb-1">
        <Searchbar
          icon={() => <AntDesign color="gray" name="search1" size={fonts.iconSize[fontSize]} />}
          onChangeText={(value) => setSearch(value)}
          placeholder="Search for Recipes"
          value={search}
        />
      </View>
      <View className="flex flex-row justify-end items-center mb-3">
        <Text
          style={{
            fontFamily: activeFont.Bold,
          }}
          className={`${fonts.cardTitle[fontSize]} text-center text-yellow-500`}
        >
          Sort: <Text className="uppercase">{sortType}</Text>
        </Text>
        <IconButton
          iconColor="#eab308"
          icon={
            sortType === 'asc'
              ? 'sort-alphabetical-ascending'
              : sortType === 'desc'
              ? 'sort-alphabetical-descending'
              : 'sort-alphabetical-variant'
          }
          size={fonts.iconSize[fontSize]}
          onPress={() => {
            if (sortType === '') {
              setSortType('asc');
            } else if (sortType === 'asc') {
              setSortType('desc');
            } else {
              setSortType('');
            }
          }}
        />
      </View>
      {recipeLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View className="mb-4">
                <RecipeCard
                  onPress={() => {
                    navigation.navigate(routes.RecipeDetail, { id: item.id });
                  }}
                  showFavoriteToggler={false}
                  {...item}
                />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text
          style={{
            fontFamily: activeFont.Regular,
          }}
          className={`${fonts.cardTitle[fontSize]} text-center my-2 text-gray-900 dark:text-gray-200`}
        >
          There are no recipes to display.
        </Text>
      )}
      <FAB
        className="absolute bg-yellow-400 bottom-0 m-8 right-0"
        icon="plus"
        onPress={() => navigation.navigate(routes.RecipeAdd)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
