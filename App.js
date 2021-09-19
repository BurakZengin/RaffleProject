import React from 'react';
import {SafeAreaView} from 'react-native';

import Ticket from './app/screens/Ticket';

const App: () => React.Node = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Ticket />
    </SafeAreaView>
  );
};

export default App;
