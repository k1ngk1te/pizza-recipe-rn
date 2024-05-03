import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, Menu, Switch } from 'react-native-paper';

import { useGlobalContext } from '../store';
import { colors, fonts } from '../config';

export default function Preferences() {
  const [fontsizeVisible, setFontsizeVisible] = React.useState(false);
  const [typefaceVisible, setTypefaceVisible] = React.useState(false);

  const {
    activeFont,
    darkMode,
    changeDarkMode,
    changeTypeface,
    changeFontSize,
    fontSize,
    typeface,
  } = useGlobalContext();

  return (
    <ScrollView style={darkMode ? { backgroundColor: colors.dark[900] } : undefined}>
      <View className="px-6 py-4" style={styles.container}>
        <View className="flex flex-row items-center justify-between mb-3">
          <Text
            style={{
              fontFamily: activeFont.Regular,
            }}
            className={`${fonts.cardTitle[fontSize]} text-gray-800 dark:text-gray-200`}
          >
            Dark Mode
          </Text>
          <View>
            <Switch
              color="orange"
              value={darkMode}
              onValueChange={(value) => changeDarkMode(value)}
            />
          </View>
        </View>

        <Divider />

        <View className="flex flex-row items-center justify-between my-3">
          <Text
            style={{
              fontFamily: activeFont.Regular,
            }}
            className={`${fonts.cardTitle[fontSize]} text-gray-800 dark:text-gray-200`}
          >
            Font
          </Text>
          <View>
            <Menu
              visible={typefaceVisible}
              onDismiss={() => setTypefaceVisible(false)}
              anchor={
                <Button onPress={() => setTypefaceVisible(true)}>
                  <Text
                    style={{
                      fontFamily: activeFont.Regular,
                    }}
                    className={`capitalize ${fonts.detailTitle[fontSize]}`}
                  >
                    {typeface}
                  </Text>
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  changeTypeface('default');
                  setTypefaceVisible(false);
                }}
                title="Default"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  changeTypeface('raleway');
                  setTypefaceVisible(false);
                }}
                title="Raleway"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  changeTypeface('roboto');
                  setTypefaceVisible(false);
                }}
                title="Roboto"
              />
            </Menu>
          </View>
        </View>

        <Divider />

        <View className="flex flex-row items-center justify-between my-3">
          <Text
            style={{
              fontFamily: activeFont.Regular,
            }}
            className={`${fonts.cardTitle[fontSize]} text-gray-800 dark:text-gray-200`}
          >
            Font Size
          </Text>
          <View>
            <Menu
              visible={fontsizeVisible}
              onDismiss={() => setFontsizeVisible(false)}
              anchor={
                <Button onPress={() => setFontsizeVisible(true)}>
                  <Text
                    style={{
                      fontFamily: activeFont.Regular,
                    }}
                    className={`capitalize ${fonts.detailTitle[fontSize]}`}
                  >
                    {fontSize}
                  </Text>
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  changeFontSize('small');
                  setFontsizeVisible(false);
                }}
                title="Small"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  changeFontSize('medium');
                  setFontsizeVisible(false);
                }}
                title="Medium"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  changeFontSize('large');
                  setFontsizeVisible(false);
                }}
                title="Large"
              />
            </Menu>
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
});
