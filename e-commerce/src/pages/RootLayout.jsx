import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { getLimitedProducts, cleanRecord } from "../store/productSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, memo } from "react";
import ProductCard from "../components/ProductCard";
import Contact from "../components/Contact";
import { Avatar } from "@material-tailwind/react";
import SkeletonLoader from "../components/SkeletonLoader";
import ToastMessage from "../components/ToastMessage";
import useCarttItems from "../hooks/use-cart-items";

const RootLayout = () => {
  const { loading, record } = useSelector((state) => state.products);
  const { addItems, error, closeShopToast, closeErrorToast } = useCarttItems();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLimitedProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cleanRecord());
  }, [dispatch]);

  const boxShow = record?.map((product, index) => (
    <div key={index}>
      <ProductCard product={product} />
    </div>
  ));
  const skeleton = [<SkeletonLoader />, <SkeletonLoader />, <SkeletonLoader />];
  const allProductSkeleton = skeleton.map((item, index) => {
    return <div key={index}>{item}</div>;
  });
  return (
    <>
      <Header main={true} />
      {/* Start Top Section */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="h-[100vh] w-full swp"
      >
        <SwiperSlide>
          <div className="swiper-item back-second">
            <div className="relative top-1/2 start-[50px] w-[200px] md:start-[100px] translate-y-[-50%] md:w-[450px] z-[200]">
              <span className="text-[25px] text-purple-400">Top Brand</span>
              <h1 className="text-white text-[30px] md:text-[60px]">
                Formal Suites
              </h1>
              <p className="text-white text-sm pb-5 mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                facilis tempora praesentium autem possimus, dolores officia..
              </p>
              <Link
                to={"/shop"}
                className="no-underline rounde-sm py-2 px-4 text-white bg-purple-500 duration-300 hover:bg-white hover:text-purple-600"
              >
                Shop Now!
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-item back-first">
            <div className="relative top-1/2 start-[50px] w-[200px] md:start-[100px] translate-y-[-50%] md:w-[450px] z-[200]">
              <span className="text-[25px] text-purple-400 relative">
                Winter Offers!
              </span>
              <h1 className="text-white text-[30px] md:text-[60px]">
                Classic & Casual
              </h1>
              <p className="text-white text-sm pb-5 mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                facilis tempora praesentium autem possimus, dolores officia..
              </p>
              <Link
                to={"/shop"}
                className="no-underline rounded-sm py-2 px-4 text-white bg-purple-500 duration-300 hover:bg-white hover:text-purple-600"
              >
                Shop Now!
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* End Top Section */}
      {/* Start Boxs Section */}
      <section className="contain grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-16">
        <div className="top-box group">
          <i className="fa-solid fa-lock fa-2x text-purple-500 top-box-items"></i>
          <h4 className="my-2 font-bold text-slate-700 top-box-items">
            Secure Payment
          </h4>
          <p className="text-sm text-slate-500 top-box-items">
            Nobis facilis tempora praesentium autem possimus
          </p>
        </div>
        <div className="top-box group">
          <i className="fa-solid fa-thumbtack fa-2x text-purple-500 top-box-items"></i>
          <h4 className="my-2 font-bold text-slate-700 top-box-items">
            Quality
          </h4>
          <p className="text-sm text-slate-500 top-box-items">
            Nobis facilis tempora praesentium autem possimus
          </p>
        </div>
        <div className="top-box group">
          <i className="fa-solid fa-tags fa-2x text-purple-500 top-box-items"></i>
          <h4 className="my-2 font-bold text-slate-700 top-box-items">
            Offers
          </h4>
          <p className="text-sm text-slate-500 top-box-items">
            Nobis facilis tempora praesentium autem possimus
          </p>
        </div>
        <div className="top-box group">
          <i className="fa-solid fa-shipping-fast fa-2x text-purple-500 top-box-items"></i>
          <h4 className="my-2 font-bold text-slate-700 top-box-items">
            Fast Delivery
          </h4>
          <p className="text-sm text-slate-500 top-box-items">
            Nobis facilis tempora praesentium autem possimus
          </p>
        </div>
      </section>
      {/* End Boxs Section */}
      {/* Start Products Section */}
      <section className="product py-16 bg-slate-100">
        <div className="text-center mb-8">
          <p className="text-[14px] text-purple-500">
            take a quick look in our products
          </p>
          <h2 className="text-slate-700 font-bold text-4xl">
            Featured Products
          </h2>
        </div>
        <div className="contain grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? allProductSkeleton : boxShow}
        </div>
        <div className="flex justify-center items-center mt-10">
          <Link
            to={"/shop"}
            className="px-5 py-2 rounded-sm text-white bg-purple-500 no-underline hover:text-purple-500 hover:bg-white border hover:border-purple-500 duration-200"
          >
            Show More
          </Link>
        </div>
      </section>
      {/* End Products Section */}
      {/* Start HeadsUp Section */}
      <section className="py-16 contain grid grid-cols-1 md:grid-rows-4 md:grid-cols-6 gap-3">
        <Link
          to={"/shop"}
          className="md:row-span-4 md:col-span-2 heads-up back-collection -z-0 after:-z-10"
        >
          <div className="relative ">
            <h3 className="font-bold text-3xl text-white">
              Look At The New Collection
            </h3>
            <p className="text-xl text-purple-300">modren choise here</p>
          </div>
        </Link>
        <Link
          to={"/shop"}
          className="md:col-span-2 md:row-span-2 heads-up back-formal -z-0 after:-z-10"
        >
          <div className="z-10">
            <h3 className="font-bold text-3xl text-white">Formal</h3>
            <p className="text-xl text-purple-300">great offers here</p>
          </div>
        </Link>
        <Link
          to={"/shop"}
          className="md:col-span-2 md:row-span-2 heads-up back-fashion -z-0 after:-z-10"
        >
          <div className="z-10">
            <h3 className="font-bold text-3xl text-white">Bueaty Fashion</h3>
            <p className="text-xl text-purple-300">great offers here</p>
          </div>
        </Link>

        <Link
          to={"/shop"}
          className="md:col-span-4 md:row-span-2 heads-up back-ladies -z-0 after:-z-10"
        >
          <div className="z-10">
            <h3 className="font-bold text-3xl text-white">
              Offers For Ladies..!
            </h3>
            <p className="text-xl text-purple-300">great offers here</p>
          </div>
        </Link>
      </section>
      {/* End HeadsUp Section */}
      {/* Start Testimonial */}
      <section className="py-16 bg-slate-100">
        <div className="text-center mb-8">
          <p className="text-[14px] text-purple-500">
            what our costumers sayed
          </p>
          <h2 className="text-slate-700 font-bold text-4xl">Customers</h2>
        </div>
        <div className="py-7">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination]}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              // when window width is >= 640px
              500: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
            }}
            slidesPerView={4}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            className="swip !h-1/4 !px-16 !py-10"
          >
            <SwiperSlide>
              <div className="flex items-center bg-white p-7 shadow-xl">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  alt="avatar"
                  className=" w-16 rounded-full pe-6"
                />
                <div>
                  <h4 className="text-slate-700 font-bold mb-2">Johanson</h4>
                  <p className="text-slate-400 text-[15px]">
                    Lorem Quae voluptatibus facilis voluptas sed repudiandae
                    odit quasi repellendus
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center bg-white p-7 shadow-xl">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  className=" w-16 rounded-full pe-6"
                />
                <div>
                  <h4 className="text-slate-700 font-bold mb-2">Tomas</h4>
                  <p className="text-slate-400 text-[15px]">
                    Lorem Quae voluptatibus facilis voluptas sed repudiandae
                    odit quasi repellendus
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center bg-white p-7 shadow-xl">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  alt="avatar"
                  className=" w-16 rounded-full pe-6"
                />
                <div>
                  <h4 className="text-slate-700 font-bold mb-2">Losiana</h4>
                  <p className="text-slate-400 text-[15px]">
                    Lorem Quae voluptatibus facilis voluptas sed repudiandae
                    odit quasi repellendus
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center bg-white p-7 shadow-xl">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  className=" w-16 rounded-full pe-6"
                />
                <div>
                  <h4 className="text-slate-700 font-bold mb-2">Morry</h4>
                  <p className="text-slate-400 text-[15px]">
                    Lorem Quae voluptatibus facilis voluptas sed repudiandae
                    odit quasi repellendus
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center bg-white p-7 shadow-xl">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  alt="avatar"
                  className=" w-16 rounded-full pe-6"
                />
                <div>
                  <h4 className="text-slate-700 font-bold mb-2">Lena</h4>
                  <p className="text-slate-400 text-[15px]">
                    Lorem Quae voluptatibus facilis voluptas sed repudiandae
                    odit quasi repellendus
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* End Testimonials */}
      {/* Start Brands Icon */}
      <section className="contain grid sm:grid-cols-1 md:grid-cols-5 py-10 gap-5">
        <div className="center-element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#507085"
              fillRule="evenodd"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M6.40625,16.80078c-3.25391,3.82031 -6.40625,8.43359 -6.40625,12.10156c0,2.11719 1.78125,5.09375 6.13281,5.09375c2.35156,0 4.6875,-0.94531 6.51563,-1.67578c3.08203,-1.23437 37.14063,-16.02344 37.14063,-16.02344c0.32813,-0.16406 0.26953,-0.37109 -0.14453,-0.26953c-0.16406,0.04297 -37.07812,10.04688 -37.07812,10.04688c-0.71094,0.19922 -1.4375,0.30859 -2.14453,0.30859c-3.19141,0 -5.34375,-1.53125 -5.34375,-4.87891c0,-1.29687 0.40625,-2.86328 1.32813,-4.70312z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="center-element">
          <img
            src={require("../ecommerce img/icons8-zara-a-spanish-fast-fashion-and-the-world's-largest-apparel-retailer-96.png")}
            alt="zara"
          />
        </div>
        <div className="center-element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#507085"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M32.68,8c-2.76,0 -5.37,0.65 -7.68,1.81c-2.32,-1.16 -4.92,-1.81 -7.68,-1.81c-9.57,0 -17.32,7.84 -17.32,17.5c0,9.66 7.75,17.5 17.32,17.5c2.75,0 5.37,-0.66 7.68,-1.81c2.31,1.16 4.92,1.81 7.68,1.81c9.57,0 17.32,-7.84 17.32,-17.5c0,-9.66 -7.75,-17.5 -17.32,-17.5zM32.68,38.55c-0.74,0 -1.47,-0.07 -2.19,-0.19c2.98,-3.09 4.79,-7.03 5.12,-11.28l0.09,-1.08h-9.7v5.38h2.85c-0.91,1.81 -2.23,3.4 -3.84,4.61c-1.62,-1.22 -2.95,-2.81 -3.86,-4.61h2.85v-5.38h-9.7l0.09,1.08c0.34,4.28 2.12,8.23 5.06,11.29c-0.7,0.12 -1.41,0.18 -2.13,0.18c-7.11,0 -12.9,-5.86 -12.9,-13.05c0,-7.19 5.79,-13.05 12.9,-13.05c0.75,0 1.48,0.06 2.18,0.18c-2.25,2.35 -3.85,5.24 -4.48,8.16l-0.26,1.21h5.46l0.23,-0.68c0.83,-2.5 2.43,-4.71 4.54,-6.3c2.12,1.59 3.73,3.8 4.56,6.3l0.23,0.68h5.46l-0.26,-1.21c-0.64,-2.98 -2.2,-5.81 -4.46,-8.15c0.71,-0.12 1.43,-0.19 2.16,-0.19c7.11,0 12.9,5.86 12.9,13.05c0,7.19 -5.79,13.05 -12.9,13.05z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="center-element">
          <img
            src={require("../ecommerce img/icons8-dior,-a-french-luxury-goods-companyand-its-world's-largest-luxury-group-96.png")}
            alt="dior"
          />
        </div>
        <div className="center-element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0,0,256,256"
          >
            <g
              fill="#507085"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M24.78125,6.03125l-0.71875,0.84375c-4.01562,4.58203 -5.96875,11.91406 -5.71875,19.15625l0.03125,0.6875l-0.90625,-1.28125c-3.67969,-5.52734 -9.25781,-8.5 -16.28125,-9.75l-1.3125,-0.25l0.125,1.34375c0.37891,3.6875 1.17969,6.69141 2.4375,9.59375l0.25,0.625h0.65625l13.3125,-0.03125h1.71875v0.03125h28.75l0.25,-0.59375c1.32422,-2.87891 2.17969,-5.98828 2.625,-9.59375l0.15625,-1.3125l-1.3125,0.21875c-7.16016,1.08594 -12.84766,4.19922 -16.75,9.6875l-0.84375,1.1875l0.03125,-0.53125c0.35156,-7.39062 -1.66016,-14.74219 -5.75,-19.21875zM24.8125,9.3125c2.89063,3.80859 4.54297,9.60547 4.4375,15.6875h-8.875c-0.02734,-5.95703 1.59375,-11.79687 4.4375,-15.6875zM2.25,18.03125c5.17188,1.14453 9.24219,3.31641 12.25,6.9375l-10.4375,0.03125c-0.86719,-2.125 -1.44141,-4.39844 -1.8125,-6.96875zM47.71875,18.03125c-0.41797,2.55078 -1.02344,4.86328 -1.9375,6.96875h-10.65625c3.17969,-3.66406 7.33203,-5.91797 12.59375,-6.96875zM3.5,29.5625c0.37891,0.82422 1,1.85547 1.53125,2.59375l39.65625,-0.03125c0.57813,-0.80859 1.13281,-1.64062 1.53125,-2.5625zM6.875,34.78125c0.82031,1.08594 1.53906,1.52734 2.5625,2.34375h30.6875c0.86328,-0.67187 1.76172,-1.46484 2.5625,-2.34375zM12.6875,39.28125c2.62109,1.62109 5.69531,2.68359 9.1875,3.40625l-0.40625,-3.40625zM22.3125,39.28125c0.67578,1.40625 1.54688,2.58594 2.53125,3.71875c0.96875,-1.15234 1.62891,-2.33203 2.3125,-3.71875zM28.15625,39.28125l-0.53125,3.21875c3.50781,-0.64453 6.59766,-1.66406 9.28125,-3.21875z"></path>
              </g>
            </g>
          </svg>
        </div>
      </section>
      {/* End Brands Icon */}
      {/* Start Contact */}
      <Contact />
      {/* End Contact */}
      <ToastMessage
        add={addItems}
        error={error}
        close={closeShopToast}
        closeError={closeErrorToast}
      />
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </>
  );
};
export default memo(RootLayout);
