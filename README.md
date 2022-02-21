# Pokemon Finder

An autocomplete for pokemon! Start typing in the input to see results from the pokeAPI.
You can type the full name or click in one of the suggestions from the list to see the picutre of the pokemon!

# Getting Started

Run 'npm install' in the root of the project to install the dependencies. The only third library I used was msw to mock
API requests in the unit tests.

I used node version 17.x.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project is divided in 3 main folders: components, pages, types.

All tests are in the App.test.tsx, one thing to improve might be break down the tests to each specific component, this way it's easier to test/track
each functionality.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
