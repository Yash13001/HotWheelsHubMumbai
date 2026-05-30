import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Bestsellers from "../components/Bestsellers";
import ConnectWithUs from "../components/ConnectWithUs";
import Showcase from "../components/Showcase";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers />
      <ConnectWithUs />
      <Showcase />
    </>
  );
}
