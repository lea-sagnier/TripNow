import React from 'react';
import { IonSpinner } from '@ionic/react';

const Loader: React.FC = () => {
    
  return (
    <div className="loader-container">
      <IonSpinner name="lines" />
    </div>
  );
};

export default Loader;
