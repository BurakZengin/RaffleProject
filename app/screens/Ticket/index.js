import React, {useEffect} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Choose from './Choose';
import Create from './Create';
import Button from '../../components/Button';
import Chevron from '../../assets/icons/svg/chevron-left.svg';
import Basket from '../../components/Basket';
import {setInitialValues, setTabIndex} from '../../redux/actions';

const renderScene = SceneMap({
  choose: Choose,
  create: Create,
});

const Ticket = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'choose', title: 'Choose'},
    {key: 'create', title: 'Create Ticket'},
  ]);

  useEffect(() => {
    setInitialValues();
  }, []);

  useEffect(() => {
    setTabIndex(index);
  }, [index]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={'#bdbdbd'}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.ticketContainer}>
      <Button
        icon={<Chevron width={14} height={14} color={'#000000'} />}
        styleOverrides={{
          container: styles.buttonContainer,
        }}
      />
      <TabView
        style={styles.tabView}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: useWindowDimensions().width}}
        renderTabBar={renderTabBar}
      />
      <Basket />
    </View>
  );
};

const styles = StyleSheet.create({
  ticketContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  tabView: {
    marginTop: 20,
  },
  indicator: {
    backgroundColor: '#6b4ed5',
    height: 1,
  },
  indicatorContainer: {
    borderWidth: 0,
  },
  tabBar: {
    backgroundColor: '#fff',
    shadowOpacity: 0,
    marginHorizontal: 24,
  },
  label: {
    color: '#6b4ed5',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    marginHorizontal: 24,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default Ticket;
