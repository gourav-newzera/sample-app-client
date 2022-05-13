import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

function StoryScreen({navigation}) {
  const [progress, setProgress] = useState(0);
  const image =
    'https://e3.365dm.com/21/07/2048x1152/skynews-rocket-space_5461660.jpg';
  useEffect(() => {
    let increase = setTimeout(() => {
      if (progress >= 1) {
        navigation.pop();
        return;
      }
      setProgress(progress + 0.01);
    }, 50);
    return () => clearTimeout(increase);
  }, [progress]);

  const news = 'ISRO launches GSLV-3';
  const reaction = 'ISRO >> NASA';

  // console.log(image);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'blue',
      }}>
      <Progress.Bar progress={progress} width={200} color={'white'} />
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{uri: image}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.text}>{news}</Text>
        <Text style={{...styles.text, fontSize: 36}}>
          {'\n\n' + reaction + '\n'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default StoryScreen;
