import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Title } from 'react-native-paper';

import { colors, fonts, routes } from '../config';
import { useGlobalContext } from '../store';

const drawerItems = [
  {
    id: 1,
    icon: 'home',
    label: routes.RecipeList,
    route: routes.RecipeList,
  },
  {
    id: 2,
    icon: 'heart',
    label: routes.Favorites,
    route: routes.Favorites,
  },
  {
    id: 3,
    icon: 'cog',
    label: routes.Preferences,
    route: routes.Preferences,
  },
  {
    id: 4,
    icon: 'weight',
    label: routes.WeightConverter,
    route: routes.WeightConverter,
  },
];

export default function DrawerNavigationContent(props) {
  const { activeFont, darkMode, fontSize } = useGlobalContext();

  return (
    <DrawerContentScrollView style={darkMode ? styles.darkContainer : undefined} {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <TouchableOpacity onPress={() => props.navigation.navigate(routes.RecipeList)}>
            <Image
              className="h-24 w-24"
              resizeMode="contain"
              source={require('../../assets/pizza.png')}
            />
          </TouchableOpacity>
          <Title
            className={`${fonts.detailTitle[fontSize]}`}
            style={[
              styles.title,
              {
                fontFamily: activeFont.Bold,
              },
            ]}
          >
            My Great Pizza Recipes
          </Title>
        </View>
        <View className="mt-5">
          {drawerItems.map((item) => {
            return (
              <View key={item.id} className="my-2">
                <DrawerItem
                  icon={({ color }) => (
                    <MaterialCommunityIcons
                      name={item.icon}
                      color={darkMode ? colors.light[100] : color}
                      size={fonts.iconSize[fontSize]}
                    />
                  )}
                  label={() => (
                    <Text
                      className={`${fonts.cardTitle[fontSize]} text-gray-800 dark:text-gray-100`}
                      style={{
                        fontFamily: activeFont.Regular,
                      }}
                    >
                      {item.label}
                    </Text>
                  )}
                  onPress={() => {
                    props.navigation.navigate(item.route);
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: colors.dark[950],
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: 10,
  },
  title: {
    marginTop: 30,
    fontWeight: 'bold',
  },
});
