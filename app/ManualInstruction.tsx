import React from 'react';
import InstructionScreen from '../components/InstructionScreen';
import ManualImage from '../assets/manual.png';

const ManualInstruction = () => {
  return (
    <InstructionScreen
      gradientColors={['#7c3aed', '#4c1d95']}
      image={ManualImage}
      title="MANUAL INSTRUCTION"
      nextScreen="SafeAtWork"
    />
  );
};

export default ManualInstruction;
