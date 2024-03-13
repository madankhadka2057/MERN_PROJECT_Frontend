import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../../store/authSlice";
import { STATUSES } from "../misc/Staruses";
import { fetchCartItem } from "../../../store/cartSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility
  const { items } = useSelector((state) => state.cart);
  const { data: user, status } = useSelector((state) => state.auth);
  // console.log(user)
  // console.log(status)
  const dispatch = useDispatch();

  const handlelLogOut = () => {
    dispatch(logOut());

    localStorage.clear();
    // if (status === STATUSES.SUCCESS) {
      return navigate("/login");
    // }
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    dispatch(fetchCartItem());
  }, [dispatch]);

  return (
     
    <div className="fixed w-full z-10 bg-white top-0">
       {/* <header>
        <img src="food.png" alt="Logo" />
      <h1>Welcome to My App</h1>
    </header> */}
      <nav
        className="relative z-10 w-full bg-white md:absolute md:bg-transparent"
        style={{ backgroundColor: "White" }}
      >
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0  ">
              <a
                onClick={() => navigate("/")}
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <img
                  src="https://tailus.io/sources/blocks/food-delivery/preview/images/icon.png"
                  className="w-12"
                  alt="tailus logo"
                  width="144"
                  height="133"
                />
                <span className="text-2xl font-bold text-yellow-900 cursor-pointer">
                  Kailash<span className="text-yellow-700">Foods</span>
                </span>
              </a>

              <button
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-10 -mr-2 lg:hidden"
                onClick={toggleMenu}
              >
                <div
                  aria-hidden="true"
                  id="line"
                  className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transition duration-300"
                ></div>
                <div
                  aria-hidden="true"
                  id="line2"
                  className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transition duration-300"
                ></div>
              </button>
            </div>

            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12`}
            >
              <div className="text-gray-600 lg:pr-4 ">
                <ul className="space-y-6 tracking-wide font-medium text-sm lg:flex-row md:flex md:flex-col md:space-y-0">
                  <li
                    className={`md:pt-4 md:pb-4 md:px-4 transition hover:text-yellow-700 ${
                      items.length !== 0 ? "md:flex-row" : ""
                    } ${!items.length && "md:flex-col"}`}
                  >
                    <Link to="/profile" className="block">
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li
                    className={` pt-4 md:pb-4 md:px-4 transition hover:text-yellow-700 ${
                      items.length !== 0 ? "md:flex-row" : ""
                    } ${!items.length && "md:flex-col"}`}
                  >
                    <a href="#" className="block">
                      <span>Wishlist</span>
                    </a>
                  </li>
                  {items.length !== 0 && (
                    <li className="pt-4 md:pb-4 md:px-4 transition hover:text-yellow-700 md:flex-row">
                      <a onClick={() => navigate("/cart")} className="block">
                        <span>Cart</span>
                        <sup>{items.length}</sup>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
                {user.length === 0 &&
                (localStorage.getItem("token") === "" ||
                  localStorage.getItem("token") === undefined ||
                  localStorage.getItem("token") === null) ? (
                  <>
                    <button
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
                    >
                      <span className="block text-yellow-800 font-semibold text-sm">
                        <Link to="/register">Sign up</Link>
                      </span>
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Login
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handlelLogOut()}
                      type="button"
                      title="Start buying"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Log Out
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
