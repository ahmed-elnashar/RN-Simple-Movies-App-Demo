import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';

const Navbar = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainNav}>
        <Text style={styles.logo}>M</Text>
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate('Search')}>
          <Icon name={'search-outline'} size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainNav: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: colors.primary,
  },
  logo: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.white,
  },
  search: {
    marginRight: 20,
  },
});
export default Navbar;
