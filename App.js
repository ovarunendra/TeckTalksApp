import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://graphql-server-dev.herokuapp.com/graphql',
});

import Header from './src/components/Header';
import Talks from './src/components/Talks';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StatusBar backgroundColor="#4064c8" barStyle="light-content" />
        <View style={styles.container}>
          <Header />
          <Talks />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f6f7f8',
  },
});
