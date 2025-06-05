import * as Font from 'expo-font';

export const loadFonts = async () => {
  return Font.loadAsync({
    'Manrope-Regular': require('./Manrope/Manrope-Regular.ttf'),
    'Manrope-Bold': require('./Manrope/Manrope-Bold.ttf'),
    'Manrope-SemiBold': require('./Manrope/Manrope-SemiBold.ttf'),
    'Manrope-Medium': require('./Manrope/Manrope-Medium.ttf'),
    'Manrope-ExtraBold': require('./Manrope/Manrope-ExtraBold.ttf'),
    'Roboto-Regular': require('./Roboto/Roboto_Condensed-Regular.ttf'),
    'Roboto-Bold': require('./Roboto/Roboto_Condensed-Bold.ttf'),

  });
};
