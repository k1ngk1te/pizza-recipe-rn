import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { RecipeCard } from '../components';
import { colors, fonts, routes } from '../config';
import { useGlobalContext } from '../store';

export default function Favorites({ navigation }) {
  const { activeFont, darkMode, fontSize, recipes, recipeLoading } = useGlobalContext();

  const favoriteRecipes = React.useMemo(() => {
    return recipes.filter((recipe) => recipe.isFavorite);
  }, [recipes]);

  return (
    <View
      className="gap-y-4 px-6 py-4"
      style={[styles.container, { backgroundColor: darkMode ? colors.dark[900] : undefined }]}
    >
      {recipeLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View className="my-2">
                <RecipeCard
                  onPress={() => {
                    navigation.navigate(routes.RecipeDetail, { id: item.id });
                  }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
