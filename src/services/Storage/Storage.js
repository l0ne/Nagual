import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('Error save to local storage: ', e);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('Error get from local storage: ', e);
  }
};

export const saveUserId = id => {
  return saveToLocalStorage('@user_id', id);
};

export const getUserId = () => {
  return getData('@user_id');
};
