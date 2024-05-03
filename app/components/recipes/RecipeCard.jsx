import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { fonts } from '../../config';
import { useGlobalContext } from '../../store';

export default function RecipeCard({
  id,
  date,
  showFavoriteToggler = true,
  isFavorite = false,
  onPress,
  title,
}) {
  const { activeFont, fontSize, toggleFavoriteRecipe } = useGlobalContext();

  return (
    <TouchableOpacity
      className="bg-white flex-row flex items-start justify-between p-4 rounded dark:bg-gray-800"
      onPress={onPress}
    >
      <View className="flex-row flex items-center">
        <View className="mr-2">
          <Image
            className="h-16 w-16"
            resizeMode="contain"
            source={require('../../../assets/pizza.png')}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: activeFont.Medium,
            }}
            className={`${fonts.cardTitle[fontSize]} mb-2 text-gray-900 tracking-wide dark:text-gray-300`}
          >
            {title}
          </Text>
          <Text
            style={{
              fontFamily: activeFont.Regular,
            }}
            className={`${fonts.cardDescription[fontSize]} text-gray-800 dark:text-gray-400`}
          >
            {date}
          </Text>
        </View>
      </View>
      {showFavoriteToggler && (
        <View>
          <IconButton
            iconColor="red"
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            onPress={() =>
              toggleFavoriteRecipe(id, (isFavorite) => {
                Alert.alert(
                  'Recipe Status',
                  title +
                    ' has been ' +
                    (isFavorite ? 'added to favourites list.' : 'removed from favourites list.')
                );
              })
            }
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
