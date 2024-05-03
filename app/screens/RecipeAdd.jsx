import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { useGlobalContext } from '../store';
import { colors, fonts } from '../config';

export default function RecipeAdd({ navigation }) {
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    ingredients: [
      {
        id: new Date().getTime(),
        title: '',
        weight: '',
      },
    ],
  });

  const [errors, setErrors] = React.useState();

  const { activeFont, darkMode, fontSize, addRecipe } = useGlobalContext();

  const addNewIngredient = React.useCallback(() => {
    setForm((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {
          id: new Date().getTime(),
          title: '',
          weight: '',
        },
      ],
    }));
  }, []);

  const removeIngredent = React.useCallback((ingredientId) => {
    setForm((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((item) => item.id !== ingredientId),
    }));
  }, []);

  const validateForm = React.useCallback(() => {
    setErrors(undefined);

    let isValid = true;

    if (!form.title) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        title: 'Recipe Title is required',
      }));
    } else if (form.title.trim().length < 5) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        title: 'Recipe Title must be at least Five (5) characters',
      }));
    }

    if (!form.description) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        description: 'Recipe Description is required',
      }));
    } else if (form.description.trim().length < 5) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        description: 'Recipe Description must be at least Five (5) characters',
      }));
    }

    if (form.ingredients.length < 1) {
      isValid = false;
      Alert.alert('Invalid Form', 'At least One (1) ingredient is required');
    } else {
      let ingredientErrors = [];
      form.ingredients.forEach((ingredient) => {
        if (!ingredient.title) {
          isValid = false;
          ingredientErrors.push({
            id: ingredient.id,
            title: 'Title is required',
          });
        }

        if (!ingredient.weight) {
          isValid = false;
          ingredientErrors.push({
            id: ingredient.id,
            weight: 'Weight is required',
          });
        }
      });
      setErrors((prevState) => ({
        ...prevState,
        ingredients: ingredientErrors,
      }));
    }

    return isValid;
  }, [form]);

  const handleInputChange = React.useCallback((name, value, ingredientId) => {
    if (typeof ingredientId !== 'undefined') {
      setForm((prevState) => {
        const ingredients = prevState.ingredients.map((ingredient) => {
          if (ingredient.id === ingredientId) {
            return {
              ...ingredient,
              [name]: value,
            };
          }
          return ingredient;
        });
        return {
          ...prevState,
          ingredients,
        };
      });
      setErrors((prevState) => {
        const ingredients = prevState.ingredients?.map((ingredient) => {
          if (ingredient.id === ingredientId) {
            return {
              ...ingredient,
              [name]: '',
            };
          }
          return ingredient;
        });
        return {
          ...prevState,
          ingredients,
        };
      });
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      setErrors((prevState) => ({
        ...prevState,
        [name]: '',
      }));
    }
  }, []);

  const handleSubmit = React.useCallback(() => {
    const isValid = validateForm();
    if (isValid) {
      const date = new Date();
      const hour = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      const data = {
        ...form,
        id: date.getTime(),
        date: date.toLocaleDateString('en-Ca') + ` ${hour}:${minutes}`,
        isFavorite: false,
      };
      addRecipe(data, () => {
        Alert.alert('New Recipe', `'${form.title}' recipe was added successfully.`);
        navigation.goBack();
      });
    }
  }, [validateForm, form, navigation]);

  return (
    <ScrollView style={darkMode ? { backgroundColor: colors.dark[900] } : undefined}>
      <View className="gap-y-4 px-6 py-4" style={styles.container}>
        <View>
          <TextInput
            className={`${fonts.detailTitle[fontSize]}`}
            label="Recipe Title"
            mode="outlined"
            placeholder="Enter Recipe Title e.g. Pepperoni Pizza"
            error={!!errors?.title}
            onChangeText={(value) => handleInputChange('title', value)}
            value={form.title}
          />
          {errors?.title && (
            <HelperText
              style={{
                fontFamily: activeFont.Regular,
              }}
              className={`${fonts.cardDescription[fontSize]} ml-0 pl-0`}
              type="error"
            >
              {errors.title}
            </HelperText>
          )}
        </View>
        <View>
          <TextInput
            className={`${fonts.detailTitle[fontSize]}`}
            label="Recipe Description"
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Describe the preparation process"
            error={!!errors?.description}
            onChangeText={(value) => handleInputChange('description', value)}
            value={form.description}
          />
          {errors?.description && (
            <HelperText
              style={{
                fontFamily: activeFont.Regular,
              }}
              className={`${fonts.cardDescription[fontSize]} ml-0 pl-0`}
              type="error"
            >
              {errors.description}
            </HelperText>
          )}
        </View>

        {form.ingredients?.map((item, index) => {
          const ingredientErrors = errors?.ingredients?.filter(
            (errorItem) => errorItem.id === item.id
          );
          const error = {};
          ingredientErrors?.forEach((errorItem) => {
            if (errorItem.title) error.title = errorItem.title;
            if (errorItem.weight) error.weight = errorItem.weight;
          });

          const value = form.ingredients?.find((ingredient) => ingredient.id === item.id);

          return (
            <View key={item.id}>
              <View className="flex flex-row items-center justify-between mb-2">
                <Text
                  style={{
                    fontFamily: activeFont.Regular,
                  }}
                  className={`${fonts.detailDescription[fontSize]} ${
                    error?.title || error?.weight
                      ? 'text-red-500'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  Ingredient {index + 1}
                </Text>
                {form.ingredients.length > 1 && (
                  <TouchableOpacity onPress={() => removeIngredent(item.id)}>
                    <MaterialCommunityIcons
                      color={darkMode ? 'white' : 'black'}
                      name="close"
                      size={20}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <TextInput
                  className={`${fonts.detailTitle[fontSize]}`}
                  label={'Ingredient Title'}
                  mode="outlined"
                  placeholder="Ingredient Title"
                  error={!!error?.title}
                  onChangeText={(value) => handleInputChange('title', value, item.id)}
                  value={value.title || ''}
                />
                {error?.title && (
                  <HelperText
                    className={`${fonts.cardDescription[fontSize]} ml-0 pl-0`}
                    type="error"
                    style={{
                      fontFamily: activeFont.Regular,
                    }}
                  >
                    {error.title}
                  </HelperText>
                )}
              </View>
              <View>
                <TextInput
                  className={`${fonts.detailTitle[fontSize]}`}
                  label={'Ingredient Weight'}
                  keyboardType="number-pad"
                  mode="outlined"
                  placeholder="Weight of Ingredient in (g)"
                  error={!!error?.weight}
                  onChangeText={(value) => handleInputChange('weight', value, item.id)}
                  value={value.weight || ''}
                />
                {error?.weight && (
                  <HelperText
                    className={`${fonts.cardDescription[fontSize]} ml-0 pl-0`}
                    type="error"
                    style={{
                      fontFamily: activeFont.Regular,
                    }}
                  >
                    {error.weight}
                  </HelperText>
                )}
              </View>
            </View>
          );
        })}

        <TouchableOpacity className="flex flex-row justify-end" onPress={addNewIngredient}>
          <View className={`flex flex-row items-center`}>
            <MaterialCommunityIcons
              color={darkMode ? 'white' : 'black'}
              name="plus"
              size={fonts.iconSize[fontSize]}
            />
            <Text
              style={{
                fontFamily: activeFont.Medium,
              }}
              className={`${fonts.buttonTitle[fontSize]}  text-gray-900 dark:text-gray-200`}
            >
              Add Ingredient
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-yellow-500 flex flex-row items-center justify-center py-4 rounded-md"
          onPress={handleSubmit}
        >
          <View className="mr-2">
            <MaterialCommunityIcons color="white" name="plus" size={fonts.iconSize[fontSize]} />
          </View>
          <Text
            style={{
              fontFamily: activeFont.Bold,
            }}
            className={`${fonts.buttonTitle[fontSize]} text-white`}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
