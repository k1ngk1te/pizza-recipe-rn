import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Menu, TextInput } from 'react-native-paper';

import { colors, fonts } from '../config';
import { useGlobalContext } from '../store';
import { convertUnit } from '../utils';

export default function Preferences() {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState(0);

  const [convertFrom, setConvertFrom] = React.useState('');
  const [convertFromVisible, setConvertFromVisible] = React.useState(false);

  const [convertTo, setConvertTo] = React.useState('');
  const [convertToVisible, setConvertToVisible] = React.useState(false);

  const { activeFont, darkMode, fontSize, scales } = useGlobalContext();

  const convertFromScale = React.useMemo(() => {
    return scales.find((scale) => scale.id === convertFrom);
  }, [scales, convertFrom]);

  const convertToScale = React.useMemo(() => {
    return scales.find((scale) => scale.id === convertTo);
  }, [scales, convertTo]);

  const handleConversion = React.useCallback(() => {
    if (!convertFromScale || !convertToScale || !input) {
      Alert.alert(
        'Invalid data',
        !convertFromScale
          ? 'From conversion unit is required.'
          : !convertToScale
          ? 'To conversion unit is required.'
          : 'Unit value is required'
      );
    } else {
      const result = convertUnit(input, convertFromScale, convertToScale);
      setResult(result);
    }
  }, [convertFromScale, convertToScale, input]);

  return (
    <ScrollView style={darkMode ? { backgroundColor: colors.dark[900] } : undefined}>
      <View className="px-6 py-4" style={styles.container}>
        <Text
          style={{
            fontFamily: activeFont.Bold,
          }}
          className={`${fonts.displayTitle[fontSize]} text-gray-800 text-center my-4 dark:text-gray-200`}
        >
          Weight Converter
        </Text>

        <View className="bg-white flex flex-row items-center mt-4 justify-center p-4 rounded-md w-full dark:bg-gray-800">
          <Text
            style={{
              fontFamily: activeFont.Bold,
            }}
            className={`${fonts.displayResult[fontSize]} dark:text-gray-300`}
          >
            {result}
          </Text>
        </View>
        <View className="gap-y-4 my-4">
          <View className="my-3">
            <TextInput
              className={`${fonts.detailTitle[fontSize]}`}
              label="Unit Value"
              keyboardType="number-pad"
              mode="outlined"
              placeholder="Enter Unit Value"
              value={input}
              onChangeText={(value) => setInput(value)}
            />
          </View>
          <Divider />
          <View className="flex flex-row items-center justify-between my-3">
            <Text
              style={{
                fontFamily: activeFont.Regular,
              }}
              className={`${fonts.cardTitle[fontSize]} text-gray-800 dark:text-gray-200`}
            >
              Convert From
            </Text>
            <View>
              <Menu
                visible={convertFromVisible}
                onDismiss={() => setConvertFromVisible(false)}
                anchor={
                  <Button onPress={() => setConvertFromVisible(true)}>
                    <Text
                      style={{
                        fontFamily: activeFont.Regular,
                      }}
                      className={`capitalize ${fonts.detailTitle[fontSize]}`}
                    >
                      {convertFromScale?.title || 'Select Unit'}
                    </Text>
                  </Button>
                }
              >
                {scales.map((scale, index) => {
                  return (
                    <React.Fragment key={scale.id}>
                      <Menu.Item
                        onPress={() => {
                          setConvertFrom(scale.id);
                          setConvertFromVisible(false);
                        }}
                        title={
                          <Text
                            style={{
                              fontFamily: activeFont.Regular,
                            }}
                            className={`capitalize ${fonts.detailTitle[fontSize]}`}
                          >
                            {scale.title}
                          </Text>
                        }
                      />
                      {index + 1 !== scales.length && <Divider />}
                    </React.Fragment>
                  );
                })}
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
              Convert To
            </Text>
            <View>
              <Menu
                visible={convertToVisible}
                onDismiss={() => setConvertToVisible(false)}
                anchor={
                  <Button onPress={() => setConvertToVisible(true)}>
                    <Text
                      style={{
                        fontFamily: activeFont.Regular,
                      }}
                      className={`capitalize ${fonts.detailTitle[fontSize]}`}
                    >
                      {convertToScale?.title || 'Select Unit'}
                    </Text>
                  </Button>
                }
              >
                {scales.map((scale, index) => {
                  return (
                    <React.Fragment key={scale.id}>
                      <Menu.Item
                        onPress={() => {
                          setConvertTo(scale.id);
                          setConvertToVisible(false);
                        }}
                        title={
                          <Text
                            style={{
                              fontFamily: activeFont.Regular,
                            }}
                            className={`capitalize ${fonts.detailTitle[fontSize]}`}
                          >
                            {scale.title}
                          </Text>
                        }
                      />
                      {index + 1 !== scales.length && <Divider />}
                    </React.Fragment>
                  );
                })}
              </Menu>
            </View>
          </View>
          <Divider />
          <TouchableOpacity
            className="bg-yellow-500 flex flex-row items-center justify-center my-3 py-4 rounded-md"
            onPress={handleConversion}
          >
            <Text
              style={{
                fontFamily: activeFont.Bold,
              }}
              className="text-base text-white"
            >
              Convert
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
  },
});
