import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import Card from './Card';

let page = 1;

const getTalskQuery = gql`
  query($page: Int) {
    talksViewer {
      talks(page: $page) {
        id
        title
        author
        imageUri
        URL
      }
    }
  }
`;

class Talks extends Component {
  _keyExtractor = item => item.id;

  render() {
    const { loading, error, talksViewer } = this.props;
    if (loading)
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    if (error)
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Error loading data.</Text>
        </View>
      );
    const { talks } = talksViewer;
    return (
      <FlatList
        data={talks}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => <Card talk={item} />}
      />
    );
  }
}

const withTalksData = graphql(getTalskQuery, {
  options: () => {
    return {
      variables: {
        page,
      },
      notifyOnNetworkStatusChange: true,
      ssr: true,
    };
  },
  props: ({ params, data: { loading, error, talksViewer, fetchMore } }) => ({
    loading,
    error,
    talksViewer,
    loadMore(page) {
      return fetchMore({
        variables: {
          page,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.talksViewer.talks === null) {
            return previousResult;
          }

          const { talksViewer } = fetchMoreResult;

          return Object.assign({}, previousResult, {
            talksViewer: {
              posts: [
                ...previousResult.talksViewer.talks,
                ...talksViewer.talks,
              ],
              __typename: 'talksViewer',
            },
          });
        },
      });
    },
  }),
});

export default withTalksData(Talks);
