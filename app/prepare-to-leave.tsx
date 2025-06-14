import React from 'react';
import PrepareImage from '../assets/images/prepare.png';
import InstructionScreen from '../components/InstructionScreen';

const PreparetoLeave = () => {
  return (
    <InstructionScreen
      gradientColors={['#fbbf24', '#f59e0b']}
      image={PrepareImage}
      title="PREPARE TO LEAVE"
      nextScreen="manual-instruction"
      allowLineBreak={true}
    />
  );
};

export default PreparetoLeave;
