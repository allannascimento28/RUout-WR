import React from 'react';
import ExecuteImage from '../assets/images/execute.png';
import InstructionScreen from '../components/InstructionScreen';

const EvacuateNow = () => {
  return (
    <InstructionScreen
      gradientColors={['#dc2626', '#be1212']}
      image={ExecuteImage}
      title="EVACUATE NOW"
      nextScreen="shelter-in-place"
    />
  );
};

export default EvacuateNow;
