import { type PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


export default function Root({ children }: PropsWithChildren) {
  return (
    <>

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body, #root, #root > div {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            
            /* Add any other global styles here */
            * {
              box-sizing: border-box;
            }
          `,
        }}
      />
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
