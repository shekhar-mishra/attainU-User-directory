import Header from './components/header/HeaderComponent'
import UserDirectoryContainer from './components/user-directory/UserDirectoryContainer'
import './App.css';

function App() {  
  return (
    <div className="App">
        <Header />       
        <UserDirectoryContainer />
    </div>
  );
}

export default App;
