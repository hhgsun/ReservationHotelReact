import React, { useEffect } from 'react';
import './styles/App.scss';
import AppHeader from './components/AppHeader';
import SelectHotelView from './views/SelectHotelView';
import SelectRoomView from './views/SelectRoomView';
import PreviewPaymentView from './views/PreviewPaymentView';
import ReservationResultView from './views/ReservationResultView';
import StepsActions from './components/StepsActions';
import { useDispatch, useSelector } from 'react-redux';
import { jumpStep, selectCompletedSteps, selectReservation, selectReservationPrice, selectStep, setHasRequestGoStep } from './store/registrySlice';
import { getHotelDetails, selectHotelDetailsStatus, sendBooking, sendUpdateBooking, STATUS } from './store/reservationSlice';
import LoadingBox from './components/LoadingBox';
import StepsNavigation from './components/StepsNavigation';

function App() {
  const dispatch = useDispatch();
  const step = useSelector(selectStep)
  const hotelsDetailsStatus = useSelector(selectHotelDetailsStatus)
  const reservation = useSelector(selectReservation)
  const reservationPrice = useSelector(selectReservationPrice)
  const completedSteps = useSelector(selectCompletedSteps)

  useEffect(() => {
    if (hotelsDetailsStatus === STATUS.idle) {
      dispatch(getHotelDetails());
    }
  }, [dispatch, hotelsDetailsStatus, reservation]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step]);

  const handlePayment = () => {
    for (const s in completedSteps) {
      if (Object.hasOwnProperty.call(completedSteps, s)) {
        const completed = completedSteps[s];
        if (completed === false) {
          return;
        }
      }
    }
    dispatch(sendBooking({
      ...reservation,
      price: reservationPrice
    }));
    dispatch(jumpStep(3));
  }

  const handleReservUpdate = () => {
    for (const s in completedSteps) {
      if (Object.hasOwnProperty.call(completedSteps, s)) {
        const completed = completedSteps[s];
        if (completed === false) {
          return;
        }
      }
    }
    if (reservation.id === "") {
      return;
    }
    dispatch(sendUpdateBooking({
      ...reservation,
      price: reservationPrice
    }));
    dispatch(jumpStep(3));
  }

  const goStepNumber = (num) => {
    dispatch(setHasRequestGoStep(num));
    // trigger save
    if (num === 3) {
      if (reservation.id) {
        handleReservUpdate();
      } else {
        handlePayment();
      }
    }
    // switch between views
    if (num === 0) {
      dispatch(jumpStep(num));
    }
    if (num === 1 && completedSteps[0]) {
      dispatch(jumpStep(num));
      return;
    }
    if (num === 2 && completedSteps[0] && completedSteps[1]) {
      dispatch(jumpStep(num));
      return;
    }
  }

  return (
    <div className="app">
      <AppHeader />

      <div className="container reservation-container">
        {step !== 3 ? <StepsNavigation goStepNumber={goStepNumber} /> : <></>}

        {
          hotelsDetailsStatus === STATUS.loading
            ? <LoadingBox />
            : <ViewCtrl step={step} />
        }

        {step !== 3 ? <StepsActions
          goStepNumber={goStepNumber}
          handlePayment={handlePayment}
          handleReservUpdate={handleReservUpdate} /> : <></>}
      </div>

    </div>
  );
}

const ViewCtrl = ({ step, childred }) => {
  switch (step) {
    case 0:
      return <SelectHotelView />;
    case 1:
      return <SelectRoomView />;
    case 2:
      return <PreviewPaymentView />;
    case 3:
      return <ReservationResultView />;
    default:
      return <SelectHotelView />;
  }
}

export default App;
