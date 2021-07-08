import Header from './components/header/HeaderComponent'
import UserDirectoryContainer from './components/user-directory/UserDirectoryContainer'
import CreateUser from './components/user-directory/CreateUser'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {  
  return (
    <div className="App">
           
        <Router>
        <Header /> 
        <Switch>
        <Route exact path="/" component={UserDirectoryContainer} />  
        <Route exact path="/createUser" component={CreateUser} />      
      </Switch>
          </Router>   
        
    </div>
  );
}

export default App;
