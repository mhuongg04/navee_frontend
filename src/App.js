import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterCustom from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterCustom />
      </BrowserRouter>
    </div>
  );
}

export default App;
