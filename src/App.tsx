import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Home />
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
