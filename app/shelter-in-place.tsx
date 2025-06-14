import React from 'react';
import InstructionScreen from '../components/InstructionScreen';

const ShelterInPlace = () => {
  return (
    <InstructionScreen
      gradientColors={['#fb923c', '#f97316']}
      image={require('../assets/images/shelter.png')}
      title="SHELTER IN PLACE"
      nextScreen="prepare-to-leave"
      allowLineBreak={true}
    />
  );
};

export default ShelterInPlace;
