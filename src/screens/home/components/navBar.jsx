import React, { useState } from "react";
import "../../../index.css";
import { Link } from "react-router-dom";
import DialogPopup from "./popup";

function NavBar(params) {
  const [searchInput, setSearchInput] = useState("");
  const [popupValue, setPopupValue] = useState(false);

  const handleOnChange = (event) => {
    console.log("changing, ", event.target.value);
    setSearchInput(event.target.value);
  };

  function handleSubmit(event) {
    console.log("handling submit");
    event.preventDefault();
    setPopupValue(true);
  }

  return (
    <div className="flex flex-col xsm:flex-row  fixed z-50 py-2 px-2 md:px-8 bg-black bg-opacity-60 items-center justify-between w-full ">
      <div className="flex justify-between flex-1 items-center">
        <Link className="text-white  text-lg " to="/">
          THE MOVIE MALL
        </Link>
        <Link className="navbar__item   " to="/">
          Home
        </Link>
      </div>
      <div className="bg-white p-2 mx-4 rounded-md  justify-self-stretch ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            {"Search: "}
            <input
              className="focus:outline-none"
              type="text"
              value={searchInput}
              onChange={handleOnChange}
            />
          </label>
        </form>
        {popupValue ? (
          <DialogPopup
            searchQuery={searchInput}
            openPopup={popupValue}
            setOnPopup={setPopupValue}
            title={searchInput}
            inputClearFunction={()=>setSearchInput("")}
          >
            {<p> this is children </p>}
          </DialogPopup>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default NavBar;
