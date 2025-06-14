import React from 'react';
import ManualImage from '../assets/images/manual.png';
import InstructionScreen from '../components/InstructionScreen';

const ManualInstruction = () => {
  return (
    <InstructionScreen
      gradientColors={['#7c3aed', '#4c1d95']}
      image={ManualImage}
      title="MANUAL INSTRUCTION"
      nextScreen="safe-at-work"
    />
  );
};

export default ManualInstruction;
