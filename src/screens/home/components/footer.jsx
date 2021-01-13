import React from "react";
import TMDB_LOGO from "../../../images/tmdblogo.svg";

function FooterComponent() {
  return (
    <div className="w-full h-16 border-t-2 p-2 flex items-center justify-between">
      <div className="flex-grow">
        <img className='h-14 w-auto p-2' src={TMDB_LOGO} alt="tmdb logo"></img>
      </div>
      <div className='flex flex-col sm:flex-row'>
      <p className="text-white text-base  sm:text-lg  sm:p-2 mr-1">@copyright 2021 </p>
      <p className="text-white text-base  sm:text-lg  sm:p-2">Developed by Akash Maurya </p>
      </div>
    </div>
  );
}

export default FooterComponent;
