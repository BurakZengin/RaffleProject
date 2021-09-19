import {createStore} from 'redux';

const initialState = {
  tabIndex: 0,
  userBalance: 0,
  tickets: [],
  selectedTickets: [],
  balanceError: false,
  ticketExistsError: false,
  newTicketNumber: '',
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAB_INDEX':
      return {
        ...state,
        tabIndex: action.payload,
        balanceError: false,
        ticketExistsError: false,
      };
    case 'SET_INITIAL_VALUES':
      return {
        ...state,
        userBalance: action.payload.userBalance,
        tickets: action.payload.tickets,
      };
    case 'INSERT_TICKET':
      return {
        ...state,
        selectedTickets: [action.payload, ...state.selectedTickets],
      };
    case 'REMOVE_TICKET':
      return {
        ...state,
        selectedTickets: state.selectedTickets.filter(
          ticket => ticket !== action.payload,
        ),
        balanceError: false,
      };
    case 'CLEAR_SELECTED_TICKET':
      return {
        ...state,
        selectedTickets: [],
        balanceError: false,
      };
    case 'SHOW_BALANCE_ERROR':
      return {
        ...state,
        balanceError: true,
      };
    case 'SHOW_EXISTS_TICKET_ERROR':
      return {
        ...state,
        ticketExistsError: true,
        newTicketNumber: '',
      };
    case 'SET_NEW_TICKET_NUMBER':
      return {
        ...state,
        newTicketNumber: action.payload,
        ticketExistsError: false,
      };
    default:
      return state;
  }
};
export default createStore(ticketReducer);
