# ProductsAppModak

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

Before run

```bash
# using npm
npm i

# OR using Yarn
yarn install
```

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

Those were the steps from the React native documentation to run the App now will present the repository

<!-- TABLE OF CONTENTS -->

## Content Table

- [ProductsAppModak](#productsappmodak)
  - [Content Table](#content-table)
    - [What](#what)
    - [About the Project](#about-the-project)
    - [Demo](#demo)
    - [Made with these amazing libraries and tools](#made-with-these-amazing-libraries-and-tools)
    - [Getting Started](#getting-started)
    - [Automated Tests](#automated-tests)
    - [Roadmap](#roadmap)
    - [Thanks](#thanks)

<!-- ABOUT THE PROJECT -->

### What

The ProductsAppModak is an app that is a challenge for a React Native position at Modak

### About the Project

This is a mobile application that allows users to explore a catalog of products by integrating with the DummyJSON API. Users can view a list of products, filter them by categories, sort them by price or rating, and navigate to detailed product pages.

The implementation also includes several bonus features for enhanced functionality

Deep Linking: Supports deep links to navigate directly to specific categories or product details.
Native Module Integration: Adds a product purchase reminder to the user's calendar using a Native Module built with Fabric for Android.
Push Notifications: Local notifications are implemented using Notifee
Unit Tests: The tests ensures the app is robust and reliable

The application is designed to be scalable, maintainable, and ready for further enhancements, with well-organized code and thoughtful use of best practices.

### Demo

These are the application images and video of the execution on Android and IOS

**Android**

<img src=".github/ProductsAppModakAndroid.png?raw=true" width="300" />

[This is the video link of app running on Android](https://github.com/tadeumx1/ProductsAppModak/.github/ProductsAppModakAndroidVideo.mov)

**IOS**

<img src=".github/ProductsAppModakIOS.png?raw=true" width="300" />

[This is the video link of app running on IOS](https://github.com/tadeumx1/ProductsAppModak/.github/ProductsAppModakIOSVideo.mp4)

### Made with these amazing libraries and tools

And below are the main libraries and tools used in the development of this application:

- [React Native](http://facebook.github.io/react-native/) - React Native is a framework that allows the development of mobile applications using Javascript and React

- [React Navigation](https://reactnavigation.org/) - React Navigation grew out of the React Native community's need for easy-to-use navigation, written entirely in Javascript

- [React Native Testing Library](https://github.com/callstack/react-native-testing-library) - The most used library at the moment for writing unit tests in React Native, its goal is to be simple, complete and encourage users to adopt good testing practices.

- [Typescript](https://github.com/microsoft/TypeScript) - TypeScript is a superset of JavaScript that adds static type support to the language. It provides an additional layer of type checking during development, helping to avoid common mistakes and improving code robustness and maintainability.

- [React Query](https://github.com/TanStack/query) - React Query is a library for state management in React applications. It provides an abstraction layer to automatically manage and synchronize data between the client and the server, along with features like caching, refetching, and data invalidation.

- [Axios](https://github.com/axios/axios) - Axios is a Promises-based HTTP client for Browser and NodeJS;

- [Jest](https://github.com/jestjs/jest) - Jest is a JavaScript testing framework maintained by Facebook. It provides a complete framework for writing and running unit tests, integration tests, and snapshot tests on JavaScript projects.

<!-- GETTING STARTED -->

## Getting Started

To run the application is simple after cloning this repository, you must follow the following commands

<!-- React Native -->

```
$ cd ProductsAppModak

$ npm install i

// Or you can use Yarn

$ yarn install

// Command to run the application

$ react-native run-android

// Or it can be on IOS devices

$ react-native run-ios
```

### Automated Tests

**Unit Tests**

In most of the applications and features that I develop, something that I always value a lot is the doing unit testing, I believe that an application with a high test coverage brings many advantages to the final product, team and company, so in this challenge it was not different, I managed to do some unit tests but coverage is low it is 30 % of statements, I think with more time it will be possible work on more tests, one of the main allies in this was having built the application using this architecture, since with this it was possible to concentrate a large part of the application business logic, in only one layer.

Coverage Image

![](.github/Coverage.png?raw=true)

For running the tests it is necessary to execute the command

```
npm run test
```

And to generate the coverage of tests with more details, it is necessary to execute the command

```
npm run coverage
```

After the folder with coverage will be generated in the root of the project in that location

```
/coverage
```

### Roadmap

In this section I separated some of the improvements that could be made in the application with more development time

- Addition of end to end tests using [Detox](https://github.com/wix/Detox) a library for this purpose

### Thanks

Thank you for the opportunity, and any questions regarding the challenge or its execution, feel free to reach me mtqr1@hotmail.com
