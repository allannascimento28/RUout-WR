import React from 'react';
import InstructionScreen from '../components/InstructionScreen';

const ShelterInPlace = () => {
  return (
    <InstructionScreen
      gradientColors={['#fb923c', '#f97316']}
      image={require('../assets/shelter.png')}
      title="SHELTER IN PLACE"
      nextScreen="PreparetoLeave"
      allowLineBreak={true}
    />
  );
};

export default ShelterInPlace;
