import {
  Navbar,
  Hero,
  Features,
  // Prices,
  Footer,
} from '@/src/components/layout';

export default async function Home() {
  return (
    <main className="flex flex-col items-center w-screen h-screen p-[1rem] bg-black">
      <div className='flex flex-col items-center bg-white w-full h-full rounded-[25px]'>
        <Navbar />
        {/* <Hero /> */}
        {/* <Features /> */}
        {/* <Prices /> */}
        {/* <Footer /> */}
      </div>
    </main>
  );
}
