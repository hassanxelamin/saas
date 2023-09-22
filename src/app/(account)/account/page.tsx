import {
    Navbar
  } from '@/src/components/layout';

export default function AccountPage() {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col xl:px-[20rem] md:px-[15rem] sm:px-[10rem] px-[3rem] mt-[3.2rem] mb-[1.3rem]'>
            <div className='font-bold text-[2rem] mb-[1.5rem]'>My Account</div>
            <div className="">
                <div className="flex text-[13px]">
                    <div className="text-black font-medium ml-[2rem]">General</div>
                    <div className="text-black text-opacity-60 font-medium ml-[2.2rem]">Notifications</div>
                </div>
                <div className="w-[1187px] h-[0px] border border-black mb-[3.5rem]"></div>
                {/* <div className="w-[33px] h-0.5 bg-zinc-800 rounded-tl-[5px] rounded-tr-[5px]" /> */}
            </div>
            <div className='flex'>
                <div>
                    <div className="w-[12rem] h-[2.3rem] bg-zinc-300 bg-opacity-50 rounded-[5px] text-black text-[1rem] font-medium text-align flex items-center p-[1rem] mb-[1rem]">Settings</div>
                    <div className="w-[12rem] h-[2.3rem] bg-zinc-300 bg-opacity-50 rounded-[5px] text-black text-[1rem] font-medium text-align flex items-center p-[1rem]">Billing</div>
                </div>
                {/* <div>
                    <div>inputs</div>
                </div> */}
            </div>
        </div>
    </div>
  );
}
