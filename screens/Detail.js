import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';

import {getMovie} from '../services/services';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';
const placeholderImage = require('../assets/images/placeholder.png');

const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieID = route.params.movieID;

  const [movieDetail, setMovieDetail] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayButtonPress = () => {
    modalVisible ? setModalVisible(false) : setModalVisible(true);
  };

  useEffect(() => {
    getMovie(movieID)
      .then(movieData => {
        setMovieDetail(movieData);
        setLoaded(true);
      })
      .catch(err => {
        setError(true);
        console.log('error Message', err);
        console.log(
          movieDetail && loaded ? 'movie Detail' : 'cannot load movieDetail',
        );
      });

    return () => {
      setLoaded(true);
    };
  }, [loaded, movieDetail, movieID]);

  return (
    <>
      {loaded && !error && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButtonContainer}>
                <PlayButton handlePress={handlePlayButtonPress} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                maxStars={5}
                disabled
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
                starSize={30}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <SafeAreaView style={styles.videoModal}>
              <Video navigation={navigation} />
            </SafeAreaView>
          </Modal>
        </View>
      )}
      {!loaded && !error && <ActivityIndicator size="large" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButtonContainer: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
