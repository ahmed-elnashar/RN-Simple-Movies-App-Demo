import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../themes/colors';

const PlayButton = ({handlePress}) => {
  return (
    <Pressable style={styles.playButton} onPress={() => handlePress()}>
      <Icon name={'caret-forward-outline'} size={30} color={'white'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playButton: {
    alignContent: 'center',
    width: 50,
    borderRadius: 50,
    padding: 10,
    backgroundColor: colors.primary,
  },
});

export default PlayButton;
