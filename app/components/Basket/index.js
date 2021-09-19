import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import store from '../../redux/reducers';
import Button from '../Button';

const Basket = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);

  store.subscribe(() => {
    const selectedTicketCount = store.getState().selectedTickets.length;
    if (selectedTicketCount !== ticketCount) {
      setTicketCount(selectedTicketCount);
    }
    if (store.getState().tabIndex === 0 && selectedTicketCount > 0) {
      setButtonStatus(false);
      return;
    }
    if (
      store.getState().tabIndex === 1 &&
      selectedTicketCount !== 3 &&
      store.getState().newTicketNumber.length === 8
    ) {
      setButtonStatus(false);
      return;
    }
    setButtonStatus(true);
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.totalPrice}>Total Price</Text>
        <Text style={styles.price}>{(ticketCount * 40).toFixed(2)}$</Text>
        <Text style={styles.ticketCount}>{ticketCount} Ticket</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Buy'}
          disabled={buttonStatus}
          styleOverrides={{
            container: styles.buttonInnerContainer,
            title: styles.buttonTitle,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderColor: '#bdbdbd',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 32,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 30,
    marginTop: 6,
    color: '#6b4ed5',
    fontWeight: '800',
  },
  ticketCount: {
    fontSize: 14,
    marginTop: 4,
    color: '#bdbdbd',
    fontWeight: '500',
  },
  buttonInnerContainer: {
    borderRadius: 10,
    backgroundColor: '#6b4ed5',
    paddingHorizontal: 54,
    paddingVertical: 22,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
});

export default Basket;
