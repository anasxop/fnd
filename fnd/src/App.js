import Home from "./pages/Home";
import Background from "./components/Background";

function App() {
  return (
    <div className="relative min-h-screen text-black dark:text-white transition-colors duration-500">
      <Background />
      <Home />
    </div>
  );
}

export default App;
