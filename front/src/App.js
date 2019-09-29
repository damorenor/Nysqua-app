import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom'; 
import SingInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import PrefAssistant from './components/prefAssistant/PrefAssistant';

function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
          <Route exact path="/" component={PrefAssistant} />
          <Route exact path="/SignIn" component={SingInPage}/>
          <Route exact path="/SignUp" component={SignUpPage}/>
        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
