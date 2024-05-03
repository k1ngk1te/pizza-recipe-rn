import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';

import { fonts, routes } from '../config';
import { useGlobalContext } from '../store';

export default function WelcomeScreen({ navigation }) {
  const { activeFont, fontSize } = useGlobalContext();

  return (
    <ScrollView
      className="bg-white dark:bg-gray-900"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image
            className="h-72 w-72"
            resizeMode="contain"
            source={require('../../assets/pizza.png')}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={{ fontFamily: activeFont.Bold }}
            className="mb-4 text-gray-800 text-xl text-center dark:text-gray-200"
          >
            My Great Pizza Recipes
          </Text>
          <Text
            style={{ fontFamily: activeFont.Medium }}
            className="text-center mb-4 text-gray-700 text-lg dark:text-gray-300"
          >
            A Pizza Recipes Library
          </Text>
          <TouchableOpacity
            className="bg-yellow-500 flex flex-row items-center justify-center py-4 rounded-md w-1/2"
            onPress={() => {
              navigation.navigate(routes.Root);
            }}
          >
            <Text
              style={{ fontFamily: activeFont.Bold }}
              className={`${fonts.buttonTitle[fontSize]} text-white`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
