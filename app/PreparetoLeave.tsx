import React from 'react';
import InstructionScreen from '../components/InstructionScreen';
import PrepareImage from '../assets/prepare.png';

const PreparetoLeave = () => {
  return (
    <InstructionScreen
      gradientColors={['#fbbf24', '#f59e0b']}
      image={PrepareImage}
      title="PREPARE TO LEAVE"
      nextScreen="ManualInstruction"
      allowLineBreak={true}
    />
  );
};

export default PreparetoLeave;
