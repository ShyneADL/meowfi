import About from "./sections/About";
import Hero from "./sections/Hero";
import InfiniteSlider from "./sections/InfiniteSlider";
import HTB from "./sections/HTB";

const App = () => {
  return (
    <div className="flex-1">
      <Hero />
      <InfiniteSlider />
      <About />
      <HTB />
    </div>
  );
};

export default App;
