import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
     const isLoggedIn = !!localStorage.getItem("token");
     const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" 
            className="text-xl font-bold text-blue-600">
              Blog App
            </Link>
             <div className="
                    flex
                    gap-4
                ">
            {isLoggedIn ? (
                        <button 
                            onClick={handleLogout}
                            className="text-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}
            <Link to="/posts">
              Posts
            </Link>
            </div>
            </div>
        </nav>
        </>
    )
}
export default Navbar;