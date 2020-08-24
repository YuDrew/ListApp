/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { 
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

const Stack = createStackNavigator();

class HomeScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }//constructor
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }//constructor

  componentDidMount() {
    fetch('https://api.jikan.moe/v3/anime/1/episodes')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.episodes });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }//componentDidMount

  render() {
    const { data, isLoading } = this.state;

    return (
      <>
        <NavigationContainer>
          <Stack.Navigator> 
            <Stack.Screen name = "Home" component={
              <>
                <Text style={styles.bigBlue}> Cowboy Bebop Episodes</Text>
                <View style={{ flex: 1, padding: 24 }}>
                  {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      renderItem={({ item }) => (
                        <Text>{item.title}, {item.title_japanese}</Text>
                      )}
                    />
                  )}
                </View>
              </>
            }/>
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }//render
};