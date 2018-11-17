import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';

const Card = ({ talk }) => {
  const { title, author, imageUri, URL } = talk;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Linking.openURL(URL);
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    width: '90%',
    margin: '5%',
    backgroundColor: '#fff',
    elevation: 20,
  },
  image: { width: null, height: null, flex: 1 },
  title: {
    marginHorizontal: 20,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    marginHorizontal: 20,
    fontSize: 12,
    color: '#66707a',
  },
});

export default Card;
