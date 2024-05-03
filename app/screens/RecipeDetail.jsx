import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';

import { colors, fonts } from '../config';
import { useGlobalContext } from '../store';

export default function RecipeDetail({ navigation }) {
  const {
    params: { id },
  } = useRoute();
  const { activeFont, darkMode, fontSize, recipes, removeRecipe, toggleFavoriteRecipe } =
    useGlobalContext();

  const recipe = React.useMemo(() => {
    return recipes.find((recipe) => id === recipe.id);
  }, [recipes, id]);

  React.useEffect(() => {
    if (!recipe) {
      navigation.goBack();
    }
  }, [navigation, recipe]);

  if (!recipe) return null;

  return (
    <ScrollView style={darkMode ? { backgroundColor: colors.dark[900] } : undefined}>
      <View className="px-6 py-4" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            className="h-48 w-48"
            resizeMode="contain"
            source={require('../../assets/pizza.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View className="mb-4 flex flex-row items-center">
              <Text
                style={{
                  fontFamily: activeFont.Bold,
                }}
                className={`${fonts.detailTitle[fontSize]} text-gray-900 dark:text-gray-200`}
              >
                {recipe.title}
              </Text>
              {recipe.isFavorite && (
                <View className="ml-4">
                  <MaterialCommunityIcons
                    color="red"
                    name="heart"
                    size={fonts.iconSize[fontSize]}
                  />
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: activeFont.Regular,
              }}
              className={`${fonts.detailDescription[fontSize]} leading-7 text-gray-800 dark:text-gray-300`}
            >
              {recipe.description}
            </Text>
          </View>

          <View className="mt-4">
            <Text
              style={{
                fontFamily: activeFont.Bold,
              }}
              className={`${fonts.detailTitle[fontSize]} mb-4 text-gray-900 dark:text-gray-200`}
            >
              Ingredients:
            </Text>

            {recipe.ingredients.map((item) => {
              return (
                <View key={item.id} className="mb-2">
                  <List.Item
                    className="bg-white rounded-md p-2 dark:bg-gray-800"
                    title={
                      <Text
                        style={{
                          fontFamily: activeFont.Bold,
                        }}
                        className={`${fonts.cardTitle[fontSize]} pb-4 text-gray-800 dark:text-gray-200`}
                      >
                        {item.title}
                      </Text>
                    }
                    description={
                      <Text
                        style={{
                          fontFamily: activeFont.Medium,
                        }}
                        className={`${fonts.cardDescription[fontSize]} mb-4 text-gray-900 dark:text-gray-300`}
                      >
                        Weight:{' '}
                        <Text
                          style={{
                            fontFamily: activeFont.Bold,
                          }}
                        >
                          {item.weight} g
                        </Text>
                      </Text>
                    }
                    style={{
                      borderRadius: 20,
                    }}
                  />
                </View>
              );
            })}
          </View>

          <View className="mt-4">
            <TouchableOpacity
              className="bg-yellow-500 flex flex-row items-center justify-center py-4 rounded-md"
              onPress={() =>
                toggleFavoriteRecipe(id, (isFavorite) => {
                  Alert.alert(
                    'Recipe Status',
                    recipe.title +
                      ' has been ' +
                      (isFavorite ? 'added to favourites list.' : 'removed from favourites list.')
                  );
                })
              }
            >
              <View className="mr-2">
                <MaterialCommunityIcons
                  color="red"
                  name={recipe.isFavorite ? 'heart-outline' : 'heart'}
                  size={fonts.iconSize[fontSize]}
                />
              </View>
              <Text
                style={{
                  fontFamily: activeFont.Bold,
                }}
                className={`${fonts.buttonTitle[fontSize]}  text-white`}
              >
                {recipe.isFavorite ? 'Remove From Favourites' : 'Add to Favourites'}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="my-4">
            <TouchableOpacity
              className="bg-red-500 flex flex-row items-center justify-center py-4 rounded-md"
              onPress={() => {
                Alert.alert(
                  'Remove Recipe?',
                  `Are you sure you want to remove the '${recipe.title}' recipe?`,
                  [
                    { text: 'No' },
                    {
                      text: 'Yes',
                      onPress: () => {
                        removeRecipe(recipe.id);
                        Alert.alert('Reciped Deleted', `${recipe.title} was removed successfully`);
                      },
                    },
                  ]
                );
              }}
            >
              <View className="mr-2">
                <MaterialCommunityIcons
                  color="white"
                  name="trash-can"
                  size={fonts.iconSize[fontSize]}
                />
              </View>
              <Text
                style={{
                  fontFamily: activeFont.Bold,
                }}
                className={`${fonts.buttonTitle[fontSize]} text-white`}
              >
                Remove Recipe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
