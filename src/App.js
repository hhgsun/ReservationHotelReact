import React, { useEffect } from 'react';
import './styles/App.scss';
import AppHeader from './components/AppHeader';
import Navigation from './components/StepsNav';
import SelectHotelView from './views/SelectHotelView';
import SelectRoomView from './views/SelectRoomView';
import PreviewPaymentView from './views/PreviewPaymentView';
import ReservationResultView from './views/ReservationResultView';
import StepsActions from './components/StepsActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectStep } from './store/registrySlice';
import { getHotelDetails, selectHotelDetailsStatus, STATUS } from './store/reservationSlice';
import LoadingBox from './components/LoadingBox';

function App() {
  const dispatch = useDispatch();
  const step = useSelector(selectStep)
  const hotelsDetailsStatus = useSelector(selectHotelDetailsStatus)

  useEffect(() => {
    if (hotelsDetailsStatus === STATUS.idle) {
      dispatch(getHotelDetails());
    }
  }, [dispatch, hotelsDetailsStatus])

  return (
    <div className="app">
      <AppHeader />

      <div className="container reservation-container">
        {step !== 3 ? <Navigation /> : <></>}

        {
          hotelsDetailsStatus === STATUS.loading
            ? <LoadingBox />
            : <ViewCtrl step={step} />
        }

        {step !== 3 ? <StepsActions /> : <></>}
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
