import { NavigationContainer } from '@react-navigation/native';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Alert } from 'react-native';
import { configureFonts, MD2DarkTheme, MD2LightTheme, PaperProvider } from 'react-native-paper';

import { keys } from './app/config';
import RootNavigation from './app/navigations/RootNavigation';
import StoreProvider from './app/store';
import storage from './app/store/storage';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const [fontSize, setFontSize] = React.useState('small');
  const [typeface, setTypeface] = React.useState('default');

  const { colorScheme, setColorScheme } = useColorScheme();

  const activeFont = React.useMemo(() => {
    if (typeface === 'raleway') {
      return {
        Regular: 'Raleway_Regular',
        Medium: 'Raleway_Medium',
        Bold: 'Raleway_Bold',
      };
    } else if (typeface === 'roboto') {
      return {
        Regular: 'Roboto_Regular',
        Medium: 'Roboto_Medium',
        Bold: 'Roboto_Bold',
      };
    } else {
      return {
        Regular: 'DMSans_Regular',
        Medium: 'DMSans_Medium',
        Bold: 'DMSans_Bold',
      };
    }
  }, [typeface]);

  const darkMode = React.useMemo(() => {
    return colorScheme === 'dark';
  }, [colorScheme]);

  const theme = React.useMemo(() => {
    const theme = {
      ...(darkMode ? MD2DarkTheme : MD2LightTheme),
      fonts: configureFonts({
        config:
          typeface === 'raleway'
            ? fontRalewayConfig
            : typeface === 'roboto'
            ? fontRobotoConfig
            : fontDMSansConfig,
        isV3: false,
      }),
    };

    return theme;
  }, [darkMode, typeface]);

  const setDarkTheme = React.useCallback(async (value) => {
    const theme = value ? 'dark' : 'light';

    await storage.store(keys.theme, theme, {
      onError: (err) => {
        Alert.alert('Save Error:', err.message);
      },
      onSuccess() {
        setColorScheme(theme);
      },
    });
  }, []);

  const changeFontSize = React.useCallback(async (value) => {
    await storage.store(keys.fontSize, value, {
      onError: (err) => {
        Alert.alert('Save Error:', err.message);
      },
      onSuccess() {
        setFontSize(value);
      },
    });
  }, []);

  const changeFontFamily = React.useCallback(async (value) => {
    await storage.store(keys.fontFamily, value, {
      onError: (err) => {
        Alert.alert('Save Error:', err.message);
      },
      onSuccess() {
        setTypeface(value);
      },
    });
  }, []);

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    async function loadFont() {
      await loadAsync({
        DMSans_Regular: require('./assets/fonts/DMSans/DMSans-Regular.ttf'),
        DMSans_Medium: require('./assets/fonts/DMSans/DMSans-Medium.ttf'),
        DMSans_Bold: require('./assets/fonts/DMSans/DMSans-Bold.ttf'),

        Raleway_Regular: require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
        Raleway_Medium: require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
        Raleway_Bold: require('./assets/fonts/Raleway/Raleway-Bold.ttf'),

        Roboto_Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        Roboto_Medium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
        Roboto_Bold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
      });

      setFontsLoaded(true);
      // await SplashScreen.hideAsync();
    }

    loadFont();
  }, []);

  React.useEffect(() => {
    async function mount() {
      try {
        const [fontFamily, fontSize, theme] = await Promise.all([
          storage.get(keys.fontFamily),
          storage.get(keys.fontSize),
          storage.get(keys.theme), // dark mode
        ]);

        // Theme
        if (theme && theme === 'dark') {
          setDarkTheme(true);
        } else setDarkTheme(false);

        // Font Size
        if (fontSize) setFontSize(fontSize);
        else changeFontSize('small');

        // Font Family
        if (fontFamily) setTypeface(fontFamily);
        else changeFontFamily('default');
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setMounted(true);
      }
    }
    mount();
  }, [changeFontFamily, changeFontSize, setDarkTheme]);

  React.useEffect(() => {
    async function hideSplash() {
      await SplashScreen.hideAsync();
    }
    if (fontsLoaded && mounted) {
      hideSplash();
    }
  }, [fontsLoaded, mounted]);

  if (!fontsLoaded || !mounted) return null;

  return (
    <PaperProvider theme={theme}>
      <StoreProvider
        activeFont={activeFont}
        darkMode={darkMode}
        fontSize={fontSize}
        typeface={typeface}
        setDarkMode={setDarkTheme}
        setFontSize={changeFontSize}
        setTypeface={changeFontFamily}
      >
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </StoreProvider>
    </PaperProvider>
  );
}

const fontDMSansConfig = {
  web: {
    regular: {
      fontFamily: 'DMSans_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'DMSans_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'DMSans_Bold',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'DMSans_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'DMSans_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'DMSans_Bold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'DMSans_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'DMSans_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'DMSans_Bold',
      fontWeight: 'normal',
    },
  },
};

const fontRalewayConfig = {
  web: {
    regular: {
      fontFamily: 'Raleway_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Raleway_Bold',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Raleway_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Raleway_Bold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Raleway_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Raleway_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Raleway_Bold',
      fontWeight: 'normal',
    },
  },
};

const fontRobotoConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto_Bold',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Roboto_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto_Bold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto_Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto_Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Roboto_Bold',
      fontWeight: 'normal',
    },
  },
};
