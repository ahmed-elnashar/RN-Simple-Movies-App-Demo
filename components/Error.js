import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import colors from '../themes/colors';

const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

const defaultProps = {
  errorText1: 'Oops! Something went wrong!',
  errorText2: 'Make sure you are online and try again :)',
};

class Error extends PureComponent {
  render() {
    const {errorText1, errorText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.errorHeading}>{errorText1}</Text>
        <Text style={styles.error}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorHeading: {
    color: colors.black,
    fontSize: 22,
  },
  error: {
    color: colors.danger,
    fontWeight: 'bold',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
