import React, {PureComponent} from 'react';
import {Text, View, FlatList, Dimensions, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends PureComponent {
  render() {
    const {title, content, navigation} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 15,
  },
  list: {
    marginTop: 25,
  },
});

List.propTypes = propTypes;

export default List;
