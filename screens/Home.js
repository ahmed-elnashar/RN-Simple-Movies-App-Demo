import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {SliderBox} from 'react-native-image-slider-box';

import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
  getDocumentaryMovies,
} from './../services/services';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTV, setPopularTV] = useState();
  const [FamilyMovies, setFamilyMovies] = useState();
  const [DocumentaryMovies, setDocumentaryMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTVData,
          FamilyMoviesData,
          DocumentaryMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTV(popularTVData);
          setFamilyMovies(FamilyMoviesData);
          setDocumentaryMovies(DocumentaryMoviesData);
        },
      )
      .catch(err => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height / 1.5}
                dotStyle={styles.sliderDots}
                autoplay={true}
                circleLoop={true}
                resizeMode="cover"
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.sliderContainer}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTV && (
            <View style={styles.sliderContainer}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTV}
              />
            </View>
          )}
          {FamilyMovies && (
            <View style={styles.sliderContainer}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={FamilyMovies}
              />
            </View>
          )}
          {DocumentaryMovies && (
            <View style={styles.sliderContainer}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={DocumentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
  sliderDots: {
    height: 0,
  },
});

export default Home;
