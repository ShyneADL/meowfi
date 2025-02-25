import About from "./sections/About";
import Hero from "./sections/Hero";
import InfiniteSlider from "./sections/InfiniteSlider";

const App = () => {
  return (
    <div className="flex-1">
      <Hero />
      <InfiniteSlider />
      <About />
    </div>
  );
};

export default App;
