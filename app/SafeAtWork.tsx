import React from 'react';
import InstructionScreen from '../components/InstructionScreen';
import TickImage from '../assets/tick.png';

const SafeAtWork = () => {
  return (
    <InstructionScreen
      gradientColors={['#4ab14f', '#1d5d21']}
      image={TickImage}
      title="SAFE AT WORK"
      nextScreen="EvacuateNow"
    />
  );
};

export default SafeAtWork;
