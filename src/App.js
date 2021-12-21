import "./App.css";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      <h1 className="heading">Interactive Comments</h1>
      <Home />
      <p className="creator">
        Created by{" "}
        <a
          href="https://efesamuel.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Efe Samuel
        </a>
      </p>
    </div>
  );
}

export default App;
