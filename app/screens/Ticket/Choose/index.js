import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Refresh from '../../../assets/icons/svg/refresh.svg';
import Button from '../../../components/Button';
import CheckBoxButton from '../../../components/CheckBoxButton';
import {clearSelectedTicket} from '../../../redux/actions';
import store from '../../../redux/reducers';

const Choose = () => {
  const [showError, setShowError] = useState(false);

  store.subscribe(() => {
    if (store.getState().balanceError) {
      setShowError(true);
      return;
    }
    if (showError) {
      setShowError(false);
    }
  });

  const renderItem = useCallback(
    ({item}) => <CheckBoxButton ticketNumber={item} />,
    [],
  );
  const keyExtractor = useCallback(item => item, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.errorText}>
          {showError && 'Your balance is not available for more'}
        </Text>
        <Button
          title={'Refresh'}
          onPress={clearSelectedTicket}
          icon={<Refresh width={14} height={14} color={'#bdbdbd'} />}
          styleOverrides={{
            container: styles.buttonContainer,
            title: styles.buttonTitle,
            iconContainer: styles.buttonIconContainer,
          }}
        />
      </View>
      <FlatList
        data={store.getState().tickets}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  flatList: {
    marginTop: 6,
  },
  flatListContainer: {
    paddingBottom: 110,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginHorizontal: 12,
  },
  buttonTitle: {
    color: '#bdbdbd',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIconContainer: {
    paddingHorizontal: 8,
  },
});

export default Choose;
