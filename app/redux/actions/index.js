import store from '../reducers';
import ticketsJSON from '../../tickets.json';

export const setInitialValues = () =>
  store.dispatch({
    type: 'SET_INITIAL_VALUES',
    payload: {
      userBalance: ticketsJSON.user_balance,
      tickets: ticketsJSON.tickets,
    },
  });

export const setTabIndex = tabIndex =>
  store.dispatch({
    type: 'SET_TAB_INDEX',
    payload: tabIndex,
  });

export const clearSelectedTicket = () =>
  store.dispatch({
    type: 'CLEAR_SELECTED_TICKET',
    payload: {},
  });

export const insertTicket = ticketNumber =>
  store.dispatch({
    type: 'INSERT_TICKET',
    payload: ticketNumber,
  });

export const removeTicket = ticketNumber =>
  store.dispatch({
    type: 'REMOVE_TICKET',
    payload: ticketNumber,
  });

export const setNewTicketNumber = newTicketNumber =>
  store.dispatch({
    type: 'SET_NEW_TICKET_NUMBER',
    payload: newTicketNumber,
  });

export const showBalanceError = () =>
  store.dispatch({
    type: 'SHOW_BALANCE_ERROR',
    payload: {},
  });

export const showTicketExistsError = () =>
  store.dispatch({
    type: 'SHOW_EXISTS_TICKET_ERROR',
    payload: {},
  });
