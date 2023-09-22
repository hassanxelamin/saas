'use client';

import YouTube from 'react-youtube';

const Promotion = () => {
  return (
    <div className="mb-8 text-white">
      <div className="mb-8">
        {/* <Logo /> */}
        <div>LOGO</div>
      </div>
      <div className="mb-8 w-90 h-48 bg-black rounded-md">
        <YouTube videoId="c5ZAvQheXO4" />
      </div>
      <div>
        <ul>
          <li className="flex items-center mb-4 font-medium">
            {/* <Checkmark className="mt-1" /> */}
            <div>!</div>
            <div className="ml-4">
              <p className="font-medium text-lg leading-6">
                Fastest widget integration in the west
              </p>
              <p className="font-normal text-base leading-5 text-white-lighter">
                And the east, for that matter.
              </p>
            </div>
          </li>
          <li className="flex items-center mb-4 font-medium">
            {/* <Checkmark className="mt-1" /> */}
            <div>!</div>
            <div className="ml-4">
              <p className="font-medium text-lg leading-6">
                Widgets so good they’ll knock your socks off
              </p>
              <p className="font-normal text-base leading-5 text-white-lighter">
                Hope you like going barefoot!
              </p>
            </div>
          </li>
          <li className="flex items-center mb-4 font-medium">
            {/* <Checkmark className="mt-1" /> */}
            <div>!</div>
            <div className="ml-4">
              <p className="font-medium text-lg leading-6">
                Widgets on widgets on widgets
              </p>
              <p className="font-normal text-base leading-5 text-white-lighter">
                What are we going to do with all these <br /> widgets??
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Promotion };
