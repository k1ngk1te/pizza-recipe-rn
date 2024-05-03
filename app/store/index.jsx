import React from 'react';
import { Alert } from 'react-native';

import storage from './storage';
import { keys } from '../config';

export const RecipeContext = React.createContext({});

export function useGlobalContext() {
  return React.useContext(RecipeContext);
}

const scales = [
  {
    id: 1,
    title: 'gram',
    plural: 'grams',
    si: 'g',
  },
  {
    id: 2,
    title: 'pound',
    plural: 'pounds',
    si: 'lb',
  },
  {
    id: 3,
    title: 'ounce',
    plural: 'ounces',
    si: 'oz',
  },
];

async function getRecipeData({ onSuccess, onError, onSettled }) {
  try {
    const data = await storage.get(keys.recipes);
    if (data) {
      const recipes = JSON.parse(data);
      onSuccess(recipes);
    } else {
      onSuccess([]);
    }
  } catch (error) {
    if (onError) onError(error);
  } finally {
    if (onSettled) onSettled();
  }
}

function Provider({
  activeFont,
  children,
  darkMode,
  fontSize,
  setDarkMode,
  setFontSize,
  setTypeface,
  typeface,
}) {
  const [recipeLoading, setRecipeLoading] = React.useState(false);
  const [recipes, setRecipes] = React.useState([]);

  const saveRecipes = React.useCallback((recipes) => {
    storage.store(keys.recipes, JSON.stringify(recipes), {
      onError: (err) => {
        Alert.alert('Save Recipe:', err.message);
      },
      onSuccess() {
        setRecipes(recipes);
      },
    });
  }, []);

  const addRecipe = React.useCallback((recipes, recipe, onSuccess) => {
    const data = [recipe, ...recipes];
    saveRecipes(data);
    if (onSuccess) onSuccess();
  }, []);

  const removeRecipe = React.useCallback((recipes, id) => {
    const data = recipes.filter((recipe) => recipe.id !== id);
    saveRecipes(data);
  }, []);

  const toggleFavoriteRecipe = React.useCallback((recipes, id, onSuccess) => {
    let isFavorite;

    const data = recipes.map((recipe) => {
      if (recipe.id === id) {
        const newValue = !recipe.isFavorite;
        isFavorite = newValue;

        return {
          ...recipe,
          isFavorite: newValue,
        };
      }
      return recipe;
    });

    saveRecipes(data);

    if (onSuccess) onSuccess(isFavorite);
  }, []);

  React.useEffect(() => {
    setRecipeLoading(true);
    getRecipeData({
      onSuccess: (recipes) => {
        setRecipes(recipes);
      },
      onError: (error) => {
        Alert.alert('Recipe Error', 'Failed to fetch: ' + error.message);
      },
      onSettled: () => {
        setRecipeLoading(false);
      },
    });
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        activeFont,

        darkMode,
        changeDarkMode: (value) => setDarkMode(value),

        fontSize,
        changeFontSize: (value) => setFontSize(value),

        typeface,
        changeTypeface: (value) => setTypeface(value),

        recipes,
        recipeLoading,
        addRecipe: (recipe, onSuccess) => addRecipe(recipes, recipe, onSuccess),
        removeRecipe: (id) => removeRecipe(recipes, id),
        toggleFavoriteRecipe: (id, onSuccess) => toggleFavoriteRecipe(recipes, id, onSuccess),

        scales,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export default Provider;
