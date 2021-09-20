import React, {PureComponent} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Navbar from './Navbar';
import Search from '../screens/Search';
import {Button} from 'react-native';
import colors from '../themes/colors';

const Stack = createNativeStackNavigator();

class MainNavigation extends PureComponent {
  render() {
    return (
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: ({navigation}) => <Navbar navigation={navigation} />,
            headerShadowVisible: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: 'Details',
            headerStyle: {backgroundColor: colors.primary},
            headerTitleStyle: {color: colors.lightGray},
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            title: 'Search',
            headerStyle: {backgroundColor: colors.primary},
            headerTitleStyle: {color: colors.lightGray},
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
