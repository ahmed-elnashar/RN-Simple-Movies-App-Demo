import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({navigation}) => {
  return (
    <VideoPlayer
      navigator={navigation}
      fullscreenOrientation="all"
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
    />
  );
};

export default Video;
