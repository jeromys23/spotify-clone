import react from "react";

//Redux
import { useSelector } from "react-redux";

//Components, styles
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login";
import "./App.css";

function App() {
  //Get access token from store
  const access_token = useSelector((state) => state.user.access_token);

  return <div className="App">{access_token ? <Dashboard />: <Login/>}</div>;
}

export default App;
