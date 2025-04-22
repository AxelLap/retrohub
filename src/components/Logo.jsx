export const Logo = () => {
  return (
    <div className="h-[70px] w-[70px] flex bg-transparent -rotate-45 rounded items-center justify-center overflow-hidden flex-col relative top-[-9px] right-[6px]">
      {/* wire */}
      <div className="flex flex-col items-center  top-0 h-[15px] w-[8px]">
        <div className="bg-gray-300 h-full w-[2px]"></div>
        <div className="bg-gray-900 mt-auto w-full h-1/3 rounded-t-md border-t border-gray-300"></div>
      </div>

      {/* body */}
      <div className="w-full h-[37px] bg-gray-300 mt-0 mb-[15px] flex justify-center relative rounded-t-lg">
        {/* direction pad */}
        <div className="flex h-[21px] w-[21px] rounded-full absolute bg-gray-300 top-[1px] left-[1px] p-0">
          <div className="ml-[8px] mt-[3px] absolute h-[15px] w-[5px] rounded-xs bg-gray-800"></div>
          <div className="p-0 flex justify-center items-center ml-[3px]  bottom-[8px] absolute h-[5px] w-[15px] rounded-xs bg-gray-800">
            <div className="bg-gray-300 h-[3px] w-[3px] rounded-full "></div>
          </div>
        </div>

        {/* start and selct buttons */}
        <div className="flex w-[19px] h-[6px]  absolute top-[12px] right-[25px] items-center   ">
          <div className="mr-auto w-[7px] h-[3px] bg-gray-800  rounded -rotate-45 "></div>
          <div className="ml-auto w-[7px] h-[3px] bg-gray-800  rounded -rotate-45 "></div>
        </div>

        {/* buttons */}
        <div className="flex h-[21px] w-[21px] rounded-full absolute bg-gray-800 top-[1px] right-[1px]">
          <div className=" ml-[8px] mt-[2px] absolute h-[5px] w-[5px] rounded-full bg-blue-500"></div>
          <div className=" ml-[8px] mt-[2px] bottom-[3px] absolute h-[5px] w-[5px] rounded-full bg-red-500"></div>
          <div className=" ml-[2px]  bottom-[8px] absolute h-[5px] w-[5px] rounded-full bg-yellow-500"></div>
          <div className=" ml-[14px]  bottom-[8px] absolute h-[5px] w-[5px] rounded-full bg-green-500"></div>
        </div>

        {/* handles and sticks */}
        <div className="mt-auto flex justify-center w-full h-1/3 bg-gray-300 relative">
          {/* left handle */}
          <div className="rounded-full bg-gray-300 h-[10px] w-[21px] absolute left-[-1px]  bottom-[-5px] z-10 -rotate-45"></div>
          <div className="rounded-full bg-gray-300 h-[10px] w-[21px] absolute left-[-6px] bottom-[-3px] z-10 rotate-90"></div>

          {/* left stick */}
          <div className="bg-gray-800 border border-gray-800 h-full w-1/2 relative flex z-0 ">
            <div className="rounded-full bg-gray-300 h-[15px] w-[15px] absolute left-[-4px] bottom-[4px] z-30 flex justify-center items-center shadow">
              <div className="w-[10px] h-[10px] bg-gray-800 rounded-full ml-[1px]"></div>
            </div>
            {/* right stick */}
            <div className="rounded-full bg-gray-300 h-[15px] w-[15px] absolute right-[-4px] bottom-[4px] z-30 flex justify-center items-center shadow">
              <div className="w-[10px] h-[10px] bg-gray-800 rounded-full mr-[1px]"></div>
            </div>
          </div>
          {/* right handle */}
          <div className="rounded-full bg-gray-300 h-[10px] w-[21px] absolute right-[-1px] bottom-[-5px] z-10 rotate-45"></div>
          <div className="rounded-full bg-gray-300 h-[10px] w-[21px] absolute right-[-7px]  bottom-[-5px] z-10 -rotate-90"></div>
        </div>
      </div>
    </div>
  );
};
