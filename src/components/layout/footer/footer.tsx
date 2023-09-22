export default async function Footer() {
  return (
    <nav className="flex items-center justify-between w-full h-[70px] border-black">
      <div className="flex items-center justify-between w-full h-full border-black border-t-2 mx-[4.8rem]">
        <div>Left</div>
        <div className="h-full font-medium mr-8">
          <div>Middle</div>
        </div>
        <div className="h-full font-medium mr-8">
          <div>Right</div>
        </div>
      </div>
    </nav>
  );
}
