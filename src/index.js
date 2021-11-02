import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pages/Home/Home';
import EditQuote from './pages/EditQuote/EditQuote';
import QuoteScreen from './pages/Quote/Quote';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from './pages/Profile/Profile';
import QuotesListScreen from './pages/QuotesList/QuotesList';
import AuthScreen from './pages/Auth/Auth';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Сыграть"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Цитаты"
        component={QuotesListScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*<Stack.Screen*/}
        {/*  options={{headerShown: false}}*/}
        {/*  name="Auth"*/}
        {/*  component={AuthScreen}*/}
        {/*/>*/}
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Root}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="QuoteScreen"
          component={QuoteScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditQuote"
          component={EditQuote}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
