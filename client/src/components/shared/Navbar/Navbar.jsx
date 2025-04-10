



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthenticated, getUserInfo, handleUserSignOutAction } from "@/store/userSlice/userSlice";
import { toast } from "sonner";
import { ScrollProgress } from "../../magicui/scroll-progress";
import GetAuroraText from "../AuroraText/AuroraText";

const Navbar = () => {
  const user = useSelector(getUserInfo);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="bg-white w-full py-3 px-4 lg:px-12 flex justify-between items-center ">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <h1 className="md:text-2xl text-lg font-bold transition-colors hover:text-gray-700">
          <GetAuroraText first={"Intern"} second={"Pilot"} />
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {isAuthenticated && <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Button>
          <li>
            <Link to="/" className=" transition-colors">
              Home
            </Link>
          </li>
          </Button>
          <li>
            <Button variant="outline"
            className="text-sm px-3 sm:px-5 hover:bg-gray-100">
            <Link
              to={user?.role === "student" ? "/jobs" : "/admin/jobs"}
              className=" transition-colors"
            >
              Jobs
            </Link>
            </Button>
          </li>
        </ul>}

        {/* Authentication Buttons */}
        {!isAuthenticated ? (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-sm px-3 sm:px-5 hover:bg-gray-100"
            >
              <Link to="/auth/signin">Sign In</Link>
            </Button>
            <Button
              variant="default"
              className="text-sm px-3 sm:px-5"
            >
              <Link to="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        ) : (
          
          <Popover  >
            
            <PopoverTrigger asChild>
              <Avatar className="w-[30px] h-[30px] cursor-pointer hover:scale-110 transition-transform">
                <AvatarImage
                  src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                  alt="User Profile"
                />
              </Avatar>
            </PopoverTrigger>
          
            <PopoverContent className="bg-white p-4 rounded-lg shadow-lg w-48 md:w-60 mt-2">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                </Avatar>
                <div>
                  <h5 className="font-bold text-sm">{user?.firstName + " " + user?.lastName}</h5>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="flex flex-col mt-4 space-y-3">
                {/* View Profile */}
                <Link to="/user/profile" className="flex items-center gap-2 transition-colors">
                  <User2 className="w-4 h-4" />
                  <span className="text-sm">View Profile</span>
                </Link>

                {/* Log Out */}
                <button
                  onClick={() => {
                    dispatch(handleUserSignOutAction()).then((response) => {
                      if (response.payload.status) {
                        toast.success(response.payload.message);
                        navigate("/");
                      } else {
                        toast.error(response.payload.message);
                      }
                    });
                  }}
                  className="flex items-center gap-2  transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Log Out</span>
                </button>
              </div>
            </PopoverContent>
            
          </Popover> 
       
        )}
      </div>
      <ScrollProgress className="top-[0px]" />

    </nav>
  );
};

export default Navbar;
