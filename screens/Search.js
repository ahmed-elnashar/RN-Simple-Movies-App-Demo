import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Error from '../components/Error';

import {searchMovieTV} from '../services/services';

const Search = ({navigation}) => {
  const [text, handleTextChange] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTV(query, 'movie'), searchMovieTV(query, 'tv')])
      .then(([movies, tvShows]) => {
        const data = [...movies, ...tvShows];
        setSearchResults(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movies or TV Shows'}
              onChangeText={handleTextChange}
              value={text}
            />
          </View>
          <TouchableOpacity onPress={() => onSubmit(text)}>
            <Icon name={'search'} size={30} color={'#4481FC'} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text style={styles.text}>No result matching your keyword</Text>
              <Text style={styles.text}>Please, try different keywords</Text>
            </View>
          )}
          {!searchResults && (
            <View>
              <Text style={styles.text}>Type something to start searching</Text>
            </View>
          )}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: '#4481FC',
    color: '#4481FC',
    fontWeight: 'bold',
    padding: 8,
  },
  container: {
    paddingTop: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  searchItems: {
    padding: 5,
  },
  noResults: {
    paddingTop: 20,
  },
  text: {
    marginLeft: 20,
  },
});

export default Search;
