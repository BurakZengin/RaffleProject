import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from '../../../components/Button';
import store from '../../../redux/reducers';
import Refresh from '../../../assets/icons/svg/refresh.svg';
import {
  setNewTicketNumber,
  showTicketExistsError,
} from '../../../redux/actions';

const Create = () => {
  const [ticketNumber, setTicketNumber] = React.useState(Array(8).fill(''));

  const [showError, setShowError] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const textInputRef = useRef([]);
  const buttonHeight = useRef(0);

  store.subscribe(() => {
    if (store.getState().ticketExistsError) {
      setShowError(true);
    }

    if (
      store.getState().newTicketNumber !== ticketNumber.join('') &&
      store.getState().newTicketNumber.length === 8
    ) {
      setTicketNumber(String(store.getState().newTicketNumber).split(''));
      clearError();
    }
  });

  useEffect(() => {
    const initState = ticketNumber.findIndex(num => !isNaN(parseInt(num, 10)));
    if (initState !== -1) {
      const indexEmptyInput = ticketNumber.findIndex(num =>
        isNaN(parseInt(num, 10)),
      );
      if (indexEmptyInput !== -1) {
        textInputRef.current[indexEmptyInput]?.focus();
      }
    }
  }, [ticketNumber]);

  const clearError = () => {
    if (showError) {
      setShowError(false);
    }
  };

  const isTicketExists = newTicketNumber => {
    return store.getState().tickets.includes(newTicketNumber);
  };

  const onChangeInput = (number, index) => {
    const newTicketNumber = [...ticketNumber];
    newTicketNumber.splice(index, 1, number.trim());
    setTicketNumber(newTicketNumber);
    clearError();
  };

  const generateTicket = () => {
    const newTicket = Math.random().toString().slice(2, 10);
    if (isTicketExists(newTicket)) {
      generateTicket();
      return;
    }
    setNewTicketNumber(newTicket);
  };

  const checkTicket = () => {
    Keyboard.dismiss();
    const newTicketNumber = ticketNumber.join('');
    if (!isTicketExists(newTicketNumber)) {
      setNewTicketNumber(newTicketNumber);
      return;
    }
    showTicketExistsError();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      if (buttonHeight.current === 0) {
        buttonHeight.current = e.startCoordinates.height - 6;
      }
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', e => {
      buttonHeight.current = 0;
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.rootContainer}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Choose your number</Text>
        <View style={styles.inputContainer}>
          {ticketNumber?.map((ticketNum, index) => (
            <TextInput
              key={index}
              ref={ref => (textInputRef.current[index] = ref)}
              onChangeText={number => onChangeInput(number, index)}
              value={ticketNum.toString()}
              multiline={false}
              maxLength={1}
              keyboardType={'numeric'}
              textAlign={'center'}
              style={styles.textInput}
            />
          ))}
        </View>
        <View style={styles.ticketRootContainer}>
          <Text style={styles.ticketTitle}>Your Ticket Numbers</Text>
          <View style={styles.ticketContainer}>
            <Text style={styles.ticket}>{ticketNumber?.join('') || '-'}</Text>
          </View>
          <Text style={styles.errorText}>
            {showError && 'Ticket number has been already bought'}
          </Text>
          <Button
            title={'Refresh'}
            icon={<Refresh width={18} height={18} color={'#6b4ed5'} />}
            onPress={generateTicket}
            styleOverrides={{
              container: styles.refreshButtonContainer,
              title: styles.refreshButtonTitle,
            }}
          />
        </View>
      </ScrollView>
      {keyboardStatus && (
        <Button
          title={'Okey'}
          onPress={checkTicket}
          styleOverrides={{
            container: [
              styles.okeyButtonContainer,
              {bottom: buttonHeight.current},
            ],
            title: styles.okeyButtonTitle,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 6,
    width: 36,
    height: 42,
    fontSize: 20,
    fontWeight: '700',
    color: '#6b4ed5',
  },
  ticketRootContainer: {
    paddingVertical: 30,
    marginVertical: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 4,
  },
  ticketTitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  ticketContainer: {
    backgroundColor: '#f55192',
    paddingVertical: 24,
    marginTop: 24,
  },
  ticket: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
  errorText: {
    marginTop: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#B00020',
    fontSize: 12,
  },
  refreshButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#6b4ed5',
    borderRadius: 10,
  },
  refreshButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b4ed5',
    paddingLeft: 12,
  },
  okeyButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#808080',
  },
  okeyButtonTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Create;
