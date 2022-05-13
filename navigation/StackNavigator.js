// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from 'react-native-elements';

import HomeScreen from '../screens/Home';
import StoryScreen from '../screens/Story';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Account',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              containerStyle={{
                paddingLeft: 10,
              }}
              type="ionicon"
              name="chevron-back"
              color="gold"
            />
          ),
          headerRight: () => (
            <Icon
              containerStyle={{
                paddingRight: 10,
              }}
              type="feather"
              name="menu"
              color="gold"
            />
          ),
        }}
      />
      <Stack.Screen name="Story" component={StoryScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
