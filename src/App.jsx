import { BrowserRouter } from "react-router-dom";
import history from "./history";
import Layouts from "./layout";
import "./App.css";


function App() {
  return (
    <>
      <BrowserRouter history={history}>
        <Layouts></Layouts>
      </BrowserRouter>
    </>
  );
}

export default App;
