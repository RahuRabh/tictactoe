import React from "react";
import cross from "../utils/cross.svg";
import circle from "../utils/circle.svg";
import crossW from "../utils/crossW.svg";
import circleB from "../utils/circleB.svg";
import toast, { Toaster } from "react-hot-toast";

const Home = ({setplayer, setgameplay}) => {

  const notify = () => toast("Invite link copied", {
    style: {
      border: '1px solid black',
      color: '#F2B237',
      backgroundColor: '#192A32',
      fontSize: '16px',
      fontWeight: '800',
      width: '220px',
      height: '40px'
    },
  });

  return (
    <div>
      <div className=" home flex items-center justify-center mt-20">
        <div className="bg-[#192A32] flex items-center justify-center w-[410px] h-[750px] rounded-[40px]">
          <div className="w-[300px] h-[400px]  jusitfy-center">
            <div className="flex gap-2 items-center justify-center">
              <img alt="altimage" src={cross} className="w-[22px] h-[22px] rounded-[7px]" />
              <img alt="altimage" src={circle} className="w-[22px] h-[22px]" />
            </div>
            <div className="bg-[#1F3540] W-[300px] h-[150px] mt-5 rounded-md">
              <h3 className="text-white text-center font-extrabold text-2xl p-4">
                PICK PLAYER
              </h3>
              <div className="bg-[#192A32] w-[270px] h-[45px] m-4 flex justify-around p-2">
                <img alt="altimage"
                  src={crossW} 
                  onClick={()=> {setplayer('cross')}}
                  className="w-[15px] h-[15px] b items-center justify-center m-2"
                />
                <div className="bg-[#D9D9D9] w-[120px] h-[30px] rounded-md flex items-center justify-center">
                  <img alt="altimage" src={circleB }
                  onClick={()=> {setplayer('circle')}}
                  />
                </div>
              </div>
              <button onClick={() => {setgameplay(true)}} className="bg-[#F2B237] w-full mt-12 p-3 font-extrabold text-[#192A32] text-sm rounded-md">
                NEW GAME (VS CPU)
              </button>
              <button className="bg-[#32C4C3] w-full mt-9 p-3 font-extrabold text-[#192A32] text-sm rounded-md">
                NEW GAME (VS HUMAN) Coming Soon
              </button>
              <button
                onClick={notify}
                className="bg-[#F2B237] w-[230px] mx-9 mt-16 p-3 font-extrabold text-sm text-[#192A32] rounded-md"
              >
                Invite your friend
              </button>
              <Toaster position="top-right"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;