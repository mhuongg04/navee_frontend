import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterCustom from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
    </div>
  );
}

export default App;
