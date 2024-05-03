import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerNavigationContent from './DrawerNavigationContent';
import { colors, fonts, routes } from '../config';
import { Favorites, Preferences, RecipeList, WeightConverter } from '../screens';
import { useGlobalContext } from '../store';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  const { activeFont, darkMode, fontSize } = useGlobalContext();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerNavigationContent {...props} />}
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
      <Drawer.Screen name={routes.RecipeList} component={RecipeList} />
      <Drawer.Screen name={routes.Favorites} component={Favorites} />
      <Drawer.Screen name={routes.Preferences} component={Preferences} />
      <Drawer.Screen name={routes.WeightConverter} component={WeightConverter} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
