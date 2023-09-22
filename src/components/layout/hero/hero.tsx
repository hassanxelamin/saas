export default function Hero() {
  return (
    <section className="flex justify-center items-center space-x-[10rem] h-[518px] w-full border-b-[2px] border-black bg-secondary-color">
      <article className="flex flex-col">
        <h1 className="font-mona w-[557px] h-[130px] text-[4.5rem] leading-[5.5rem]">
          Your AI-Powered Companion for Enlightened Reading
        </h1>
        <p className="w-[535px] h-[40px] text-[1.6rem] font-medium">
          Transform highlights into dynamic notes, get instant answers to
          queries, and integrate effortlessly with your digital workspaces. Dive
          deeper, learn smarter.
        </p>
      </article>
      <div className="w-[566px] h-[367px] bg-white rounded-[30px] border-l-[4px] border-r-[4px] border-t-[4px] border-b-[4px] border-black" />
    </section>
  );
}
