
import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/login';
import rootReducers from './reducers';
import Registration from './components/registration';
import { UserListComponent } from './components/user-list';
import { UserProfileComponent } from './components/user-profile';

const store = createStore(rootReducers)

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<UserProfileComponent />} />
          <Route path="/user-list" element={<UserListComponent />} />
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <Registration /> */}
      {/* <UserProfileComponent /> */}
      {/* <UserListComponent /> */}
    </Provider>

  );
}

export default App;
