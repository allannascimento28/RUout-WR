# RUOUTApp - Emergency Response Mobile App

This README provides instructions on how to set up and run the RUOUTApp, a React Native application built with Expo for emergency response scenarios.

## Project Overview

RUOUTApp is designed to assist with incident management and emergency responses. It allows users to:
- Access emergency response instructions
- Share evacuation alerts and safety information
- Record audio and capture images during incidents
- Manage response documentation
- View video tutorials for emergency procedures

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator or Android Emulator (optional for development)
- Physical device with [Expo Go](https://expo.dev/client) app installed (for testing)

## Installation

1. Clone the repository (or extract the project files):
```bash
git clone https://github.com/allannascimento28/RUout-WR.git
cd ruoutwar-app
```

2. Install the dependencies:
```bash
npm install
```
or if you use yarn:
```bash
yarn install
```

3. Make sure font assets are properly linked:
```bash
npx react-native-asset
```

## Running the Application

### Start the Development Server

```bash
npm start
```
or
```bash
npx expo start
```

This will start the Metro Bundler and display a QR code in your terminal.

### Run on Physical Device

1. Install the Expo Go app on your iOS or Android device
2. Scan the QR code with your camera (iOS) or directly from the Expo Go app (Android)
3. The app should load on your device

### Run on Simulator/Emulator

From the Metro Bundler interface:
- Press `i` to run on iOS Simulator
- Press `a` to run on Android Emulator

## Project Structure

```
ruoutwar-app/
├── assets/                # Images, fonts, and other static resources
├── components/            # Reusable UI components
├── navigation/            # Navigation configuration
├── screens/               # Application screens
├── App.tsx               # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Key Features

- **Emergency Response Options**: Different response types (Evacuate Now, Shelter in Place, etc.)
- **Pre-Incident Links**: Access to important pre-incident information
- **Media Files**: Record audio notes and capture images during incidents
- **Response Documentation**: Document refusals, persons with disabilities, and signs of danger
- **Video Tutorials**: Access to training videos and response instructions

## Troubleshooting

- **Font Loading Issues**: If you encounter font loading issues, make sure all fonts are properly linked. You might need to rebuild the app after linking.

- **Expo AV Module Issues**: If video or audio playback isn't working, check that the `expo-av` module is properly installed and your device has necessary permissions.

- **Device Permissions**: The app requires camera, microphone, and storage permissions. Make sure to grant these when prompted.

- **Metro Bundler Connection**: If your device can't connect to Metro Bundler, make sure your device and computer are on the same network.
- **Web Build, CLI related issue**:  Reinstall expo cli
```bash
npm uninstall -g expo-cli
npm install -g @expo/cli
```


## Running on Specific Platforms

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

For web:
```bash
npm run web
```

## Web Builds

### Required Web Dependencies

The following web dependencies should be installed (already included in package.json):
```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

### Running Web Development Server

To start the development server for web:
```bash
npx expo start --web
```

### Creating Production Web Builds

To create a production-ready web build:

```bash
npx expo export --platform web
```

Or use the simpler command:

```bash
npx expo build:web
```

Both commands will generate a `web-build` directory containing all the static files needed for deployment.

### Serving the Web Build Locally

To test the web build locally before deployment:

```bash
npx serve web-build
```
