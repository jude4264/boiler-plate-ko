// import logo from './logo.svg';
import './App.css';
import React from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>

        {/*
          A <Routes> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Routes> any time
          you have multiple Routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={ <LandingPage /> }>
          </Route>
          <Route exact path="/login" element = {<LoginPage />}>
          </Route>
          <Route exact path="/register" element={ <RegisterPage/> }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these elements as "pages"
// in your app.
