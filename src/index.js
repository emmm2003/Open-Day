import React from 'react'; // Importing the core React library, which is necessary for defining and using React components
import ReactDOM from 'react-dom/client'; // Importing the ReactDOM library, which is responsible for rendering React components into the DOM
import App from './App'; // Importing the main App component that will be rendered to the DOM

// Select the DOM element with the id 'root' where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the 'root' element of the DOM
root.render(
  // `React.StrictMode` is a wrapper that helps identify potential problems in the app during development
  // It runs extra checks, like warnings for deprecated APIs or unsafe lifecycle methods
  // It does not affect the app in production, it's only active in development
  <React.StrictMode>
    {/* The main App component is being rendered here */}
    <App />
  </React.StrictMode>
);
