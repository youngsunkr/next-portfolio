import Image from "next/image";
import Hero from "./components/home/hero";
import AnimationComponent from './components/home/animation';
import dynamic from 'next/dynamic';

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col item-center justify-center text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <Hero />
        <AnimationComponent />
      </div>
    </section>
  );
}
