import React from 'react';
import { IonSpinner , IonImg} from '@ionic/react';

const Loader: React.FC = () => {
    
  return (
    <div className="loader-container d-flex">
      <IonImg src="../../public/assets/logo/logo.svg"
      alt="logo tripNow"/>
      <IonSpinner name="lines" />
    </div>
  );
};

export default Loader;
