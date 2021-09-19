import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import store from '../../redux/reducers';
import {
  insertTicket,
  removeTicket,
  showBalanceError,
} from '../../redux/actions';

const CheckBoxButton = ({ticketNumber}) => {
  const userBalance = store.getState().userBalance;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  store.subscribe(() => {
    const isSelected = store.getState().selectedTickets.includes(ticketNumber);
    if (isSelected && !toggleCheckBox) {
      setToggleCheckBox(true);
      return;
    }
    if (!isSelected && toggleCheckBox) {
      setToggleCheckBox(false);
    }
  });

  const onPressTicket = () => {
    if (toggleCheckBox) {
      removeTicket(ticketNumber);
      return;
    }
    if (store.getState().selectedTickets.length < userBalance) {
      insertTicket(ticketNumber);
      return;
    }
    showBalanceError();
  };

  return (
    <TouchableOpacity
      onPress={onPressTicket}
      style={[
        styles.container,
        {backgroundColor: toggleCheckBox ? '#6b4ed5' : '#e4e3f3'},
      ]}>
      <CheckBox
        style={styles.checkbox}
        value={toggleCheckBox}
        disabled={true}
        boxType={'square'}
        onCheckColor={'#6b4ed5'}
        onFillColor={'#fff'}
        onTintColor={'#fff'}
        tintColor={'#fff'}
      />
      <Text
        style={[
          styles.text,
          {
            color: toggleCheckBox ? '#fff' : '#000',
          },
        ]}>
        {ticketNumber}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 10,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#6b4ed5',
  },
  checkbox: {
    backgroundColor: '#fff',
    width: 22,
    height: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 14,
  },
});

export default React.memo(CheckBoxButton);
