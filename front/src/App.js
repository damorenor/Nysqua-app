import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom'; 
import SingInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import PrefAssistant from './components/prefAssistant/PrefAssistant';
import Home from './components/home/Home';
import UserProfile from './components/userProfile/UserProfile';

function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
          <Route exact path="/" component={UserProfile} /> 
          <Route exact path="/SignIn" component={SingInPage}/>
          <Route exact path="/SignUp" component={SignUpPage}/>
          <Route exact path="/PrefAssistant" component={PrefAssistant}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/UserProfile" component={UserProfile}/>
        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
