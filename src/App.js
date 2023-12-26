import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert'
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  const [myAlert, mySetAlert] = useState(null)
  const alertFunc = (message, type) => {
    mySetAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      mySetAlert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <div className="App">
            <Navbar alertFunc={alertFunc} />
            <Alert myAlert={myAlert} />
            <div className="container">
              <Routes>
                <Route key="1" exact path="/" element={<Home alertFunc={alertFunc} />}>
                </Route>
                <Route key="2" exact path="/login" element={<Login alertFunc={alertFunc} />}>
                </Route>
                <Route key="3" exact path="/signup" element={<SignUp alertFunc={alertFunc} />}>
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
