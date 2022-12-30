import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };

    return (
        <div className="navbar shadow-lg">
            <div className="navbar-start">
                <Link
                    to="/"
                    className="flex rounded-lg py-2 font-semibold text-[#5596e6] text-2xl"
                >
                    {/* <img src={logo} className="w-8 rounded-full " alt="" /> */}
                    <span className="px-1"> SayUs</span>
                </Link>
            </div>
            <div className="navbar-center hidden md:flex lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/media">Media</Link>
                    </li>

                    <li>
                        <Link>Meassage</Link>
                    </li>

                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL} alt="" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link>Profile</Link>
                        </li>
                        <div className="lg:hidden md:hidden">
                            <li>
                                <Link>Home</Link>
                            </li>

                            <li>
                                <Link>Media</Link>
                            </li>

                            <li>
                                <Link>Meassage</Link>
                            </li>

                            <li>
                                <Link to='/about'>About</Link>
                            </li>
                        </div>
                        {user?.email ? (
                            <>
                                <li>
                                    <button onClick={handleLogOut}>logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;