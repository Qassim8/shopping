import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-slate-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-4 text-white contain">
          <div className="me-[25px] mb-3">
            <h3 className="pe-3 pb-1 font-bold text-lg inline-block">
              <span className="italic text-purple-300">Git-</span>
              Shop
            </h3>
            <span>
              it's an online market for show and sell cloths and shoes and other
              stuff, we hope to find your needs in here and thanks for choosing
              us have a good shopping
            </span>
            <div className="flex items-center mt-4">
              <Link className="social-icon hover:bg-blue-500">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link className="social-icon hover:bg-cyan-400">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link className="social-icon hover:bg-purple-500">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
          </div>
          <div className="me-5 mb-3">
            <h3 className="pb-2">
              <span className="text-xl font-bold text-purple-600 italic">
                M
              </span>
              enu
            </h3>
            <ul className="flex flex-col">
              <li>
                <Link to={"/shop"} className="menu-link">
                  shop
                </Link>
              </li>
              <li>
                <Link to={"/cart"} className="menu-link">
                  cart
                </Link>
              </li>
              <li>
                <Link to={"/wishlist"} className="menu-link">
                  wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div className="me-5 mb-3">
            <h3 className="pb-2">
              <span className="text-xl font-bold text-purple-600 italic">
                S
              </span>
              ervices
            </h3>
            <ul className="flex flex-col">
              <li className="py-2">Shipping</li>
              <li className="py-2">Returning</li>
              <li className="py-2">Recommanded</li>
            </ul>
          </div>
          <div className=" mb-3">
            <h3 className="pb-2">
              <span className="text-xl font-bold text-purple-600 italic">
                S
              </span>
              ubscribe
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="p-1 my-2 bg-transparent md:w-[250px] border border-white outline-none"
                placeholder="Send Message..."
              />
              <button className="mt-2 py-1 px-5 text-white bg-purple-600 md:w-[250px] outline-none duration-300 hover:bg-white hover:text-purple-600">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="py-2 bg-slate-900 text-white text-center">
          Copyright &copy;
          <span className="italic text-purple-300"> Mo-</span>
          Shop 2023
        </div>
      </footer>
    </>
  );
};
export default Footer;
