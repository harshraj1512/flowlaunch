import React, { useEffect, useState } from "react";

const Navbar = () => {
    const[sticky,setSticky]=useState(false);
    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY >0){
                setSticky(true)
            }else{
                setSticky(false)
            }
            window.addEventListener("scroll",handleScroll)
            return ()=>{
                window.removeEventListener("scroll",handleScroll)
            }
        }
    },[])
  return (
    <>
      <div
        className={` max-w-screen-2xl container mx-auto  fixed top-0 left-0 right-0 z-50 ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar bg-white">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Todos Table</a>
          </div>
          <div className="flex-none gap-2">
            
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
