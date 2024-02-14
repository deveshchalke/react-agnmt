import React, { useState } from 'react';
import LoginForm from './LoginFor';
import HomePage from './HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Function to save login token
  const saveToken = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <HomePage /> : <LoginForm saveToken={saveToken} />}
    </div>
  );
}

export default App;








































// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
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
