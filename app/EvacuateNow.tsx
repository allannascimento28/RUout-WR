import React from 'react';
import InstructionScreen from '../components/InstructionScreen';
import ExecuteImage from '../assets/execute.png';

const EvacuateNow = () => {
  return (
    <InstructionScreen
      gradientColors={['#dc2626', '#be1212']}
      image={ExecuteImage}
      title="EVACUATE NOW"
      nextScreen="ShelterInPlace"
    />
  );
};

export default EvacuateNow;
