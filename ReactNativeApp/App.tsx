import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Container>
      <Text>Open up App.js to start working on your app!</Text>
    </Container>
  );
};

export default App;
