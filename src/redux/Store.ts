import { configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import Pagination from 'src/redux/Pagination/Pagination';
import rooms from './Rooms/Rooms';
import RootSaga from './RootSaga';
import Authentication from './Authentication/Authentication';
import filters from './Filters/FiltersSlice';
import Registration from './Registration/Registration';
import roomCardsStatus from './RoomCardsStatus/RoomCardsStatusSlice';
import signInCardReducer from './SignInCard/SignInCardReducer';
import booking from './Booking/BookingSlice';
import CurrentRoom from './CurrentRoom/CurrentRoom';
import modalWindiw from './ModalWindow/ModalWindow';
import currentRoomComments from './CurrentRoomComments/CurrentRoomComments';
import review from './Review/Review';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      Authentication,
      filters,
      rooms,
      review,
      Pagination,
      signInCardReducer,
      Registration,
      roomCardsStatus,
      booking,
      CurrentRoom,
      modalWindiw,
      currentRoomComments,
    },
    middleware: [
      ...getDefaultMiddleware(),
      sagaMiddleware,
    ],
  });
  (store as SagaStore).sagaTask = sagaMiddleware.run(RootSaga);
  return store;
};

const wrapper = createWrapper(makeStore);

type AppStore = ReturnType<typeof makeStore>;
type AppState = ReturnType<AppStore['getState']>;

export default wrapper;

export type { AppStore, AppState };
