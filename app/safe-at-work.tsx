import React from 'react';
import TickImage from '../assets/images/tickWatch.png';
import InstructionScreen from '../components/InstructionScreen';

const SafeAtWork = () => {
  return (
    <InstructionScreen
      gradientColors={['#4ab14f', '#1d5d21']}
      image={TickImage}
      title="SAFE AT WORK"
      nextScreen="evacuate-now"
    />
  );
};

export default SafeAtWork;
