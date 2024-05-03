import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigation from './DrawerNavigation';
import { colors, fonts, routes } from '../config';
import { RecipeAdd, RecipeDetail, WelcomeScreen } from '../screens';
import { useGlobalContext } from '../store';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { activeFont, darkMode, fontSize } = useGlobalContext();

  return (
    <Stack.Navigator
      screenOptions={
        darkMode
          ? {
              headerStyle: {
                backgroundColor: colors.dark[950],
              },
              headerTitleStyle: {
                fontFamily: activeFont.Bold,
                fontSize: fonts.headerTitle[fontSize],
              },
              headerTintColor: colors.light[100],
            }
          : undefined
      }
    >
      <Stack.Screen
        name={routes.WelcomeScreen}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.Root}
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.RecipeDetail} component={RecipeDetail} />
      <Stack.Screen name={routes.RecipeAdd} component={RecipeAdd} />
    </Stack.Navigator>
  );
}
