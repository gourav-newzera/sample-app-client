import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {gql, useMutation, useQuery} from '@apollo/client';
import {launchImageLibrary} from 'react-native-image-picker';

const userID = 10;

const GET_USER = gql`
  query getUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      name
      job
      url
      photo
    }
  }
`;

const UPDATE_PICTURE = gql`
  mutation updateMutation($updateUserId: ID!, $photo: String!) {
    updateUser(id: $updateUserId, photo: $photo) {
      id
      name
      job
      url
      photo
    }
  }
`;

function HomeScreen({navigation}) {
  const [image, setImage] = useState('https://reactjs.org/logo-og.png');
  const [name, setName] = useState('Byung Hoo');
  const [designation, setDesignation] = useState('Photographer');
  const [website, setWebsite] = useState('www.me.com');
  const [color, setColor] = useState('gold');

  const {error, data, loading} = useQuery(GET_USER, {
    variables: {getUserId: userID},
  });

  const [mutateFunction, response] = useMutation(UPDATE_PICTURE);

  useEffect(() => {
    // console.log(loading, data, error);
    if (loading) {
    } else {
      const user = data.getUser;
      setImage(user.photo);
      setDesignation(user.job);
      setName(user.name);
      setWebsite(user.url);
    }
  }, [loading, data, error]);

  const changeImage = async () => {
    try {
      const {didCancel, assets} = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (didCancel) return;
      if (assets) {
        mutateFunction({
          variables: {
            updateUserId: userID,
            photo: assets[0].uri,
          },
        });
        setImage(assets[0].uri);
        setColor('gold');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(image);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <TouchableOpacity
          onLongPress={changeImage}
          onPress={() => {
            navigation.navigate('Story');
            setColor('gray');
          }}>
          <ImageBackground
            source={{uri: image}}
            resizeMode="cover"
            style={{...styles.image, borderColor: color}}
          />
        </TouchableOpacity>
        <View style={styles.story}>
          <Icon
            type="entypo"
            name="circle-with-plus"
            color="gold"
            size={30}
            onPress={() => {
              navigation.navigate('Story');
              setColor('gray');
            }}
          />
        </View>
      </View>
      <View>
        <Text style={styles.text}>{'\n' + name}</Text>
        <Text style={{...styles.text, fontSize: 18}}>
          {'\n' + designation + '\n'}
          {website + '\n'}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'gold',
          borderBottomWidth: 1,
          width: '100%',
          position: 'absolute',
          bottom: 100,
        }}
      />
      <View style={styles.bottom}>
        <Icon type="entypo" name="triangle-up" color="gold" size={55} />
        <View style={styles.square} />
        <View style={styles.square2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'gray',
    fontSize: 28,
    lineHeight: 28,
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    bottom: 40,
  },
  square: {
    borderColor: 'gold',
    borderWidth: 2,
    height: 30,
    width: 30,
    bottom: 47,
    backgroundColor: 'white',
  },
  square2: {
    borderColor: 'gold',
    borderWidth: 2,
    height: 25,
    width: 25,
    bottom: 20,
    backgroundColor: 'gold',
  },
  story: {position: 'absolute', bottom: 10, right: 3},
});

export default HomeScreen;
