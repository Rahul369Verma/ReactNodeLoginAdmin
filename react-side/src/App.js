import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Navigator from "./components/Navigator"
import Login from "./components/Login"
import User from "./components/User"
import Logout from "./components/Logout";
import Error from "./components/Error"

import './App.css'
import { Provider } from './context';

const App = () => {


  return (
    <Provider>
      <BrowserRouter>
        <Navigator />
        <Switch> {/* by switch we can handle err page */}
          <Route exact path='/'><Home /></Route>
          <Route exact path='/register'><Register /></Route>
          <Route exact path='/login'><Login /></Route>
          <Route exact path='/user'><User /></Route>
          <Route exact path='/logout'><Logout /></Route>
          <Route><Error/></Route> {/* Error Page */}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App