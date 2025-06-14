import AsyncStorage from "@react-native-async-storage/async-storage";


export const getDeeplinkParams = async () => {
  let params: Record<string, string> = {};
  params = JSON.parse(await AsyncStorage.getItem('deeplinkParams') || '{}');
  return params;
}

export const setDeeplinkParams = (params: Record<string, string>) => {
    
    AsyncStorage.setItem('deeplinkParams', JSON.stringify(params))
        .then(() => {
        console.log("Deeplink params saved successfully");
        })
        .catch((error) => {
        console.error("Error saving deeplink params:", error);
        });

}