import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData(key, options) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (options?.onSuccess) options.onSuccess(value);
    return value;
  } catch (err) {
    if (options?.onError) options.onError(err);
  } finally {
    if (options?.onSettled) options.onSettled(err);
  }
}

export async function storeData(key, value, options) {
  try {
    await AsyncStorage.setItem(key, value);
    if (options?.onSuccess) options.onSuccess(value);
    return value;
  } catch (err) {
    if (options?.onError) options.onError(err);
  } finally {
    if (options?.onSettled) options.onSettled(err);
  }
}

const storage = {
  get: getData,
  store: storeData,
};

export default storage;
