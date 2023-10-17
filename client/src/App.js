import './App.css';
import Router from "./Route/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
