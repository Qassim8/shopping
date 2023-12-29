import { useState, useEffect, memo, useCallback} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, cleanProducts, getItems, cleanRecord } from "../store/productSlice";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageName from "../components/PageName";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import ToastMessage from "../components/ToastMessage";
import useCarttItems from "../hooks/use-cart-items";

const Shop = () => {

  const { products, loading } = useSelector((state) => state.products);
  const {addItems, error, closeShopToast, closeErrorToast} = useCarttItems();
  const [filtering, setFiltering] = useState("");
  const dispatch = useDispatch();
  const skeleton = [
    <SkeletonLoader />,
    <SkeletonLoader />,
    <SkeletonLoader />,
    <SkeletonLoader />,
    <SkeletonLoader />,
    <SkeletonLoader />,
  ];
  const topRateSkeleton = skeleton.map((item, id) => {
    return (
        <SwiperSlide key={id}>{item}</SwiperSlide>
      
    );
  });
  const allProductSkeleton = skeleton.map((item, id) => {
    return <div key={id}>{item}</div>;
  });
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const searchItem = useCallback((el) => {
    const debounce = setTimeout(() => {
      if (el.length !== 0) {
        return dispatch(getItems(el));
      } else {
        return dispatch(getProducts());
      }
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  },[dispatch]);
  
  useEffect(() => {
    dispatch(cleanProducts());
    dispatch(cleanRecord())
  }, [dispatch]);

  const topRated = products?.map(
    (product, index) =>
      product.rating.rate >= 4.5 && (
        <SwiperSlide key={index}>
          <ProductCard product={product} />
        </SwiperSlide>
      )
  );
  const allProducts = products?.map((product, index) => (
    <div key={index}>
      <ProductCard product={product} />
    </div>
  ));


  return (
    <>
      <Header main={true} />
      <PageName pageName={"Shop"} icon={"fa-shop text-purple-500"} />
      {/* Start Top Rated Items */}
      <section className="container-left py-10">
        <div className="border-b border-slate-400">
          <p className="text-xl text-slate-800 pb-3 ms-0 ps-0">Top Rated</p>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1000: {
                slidesPerView: 4,
              },
            }}
            slidesPerView={5}
            spaceBetween={15}
            className="!h-1/4 !py-5 !pe-10"
          >
            {loading ? topRateSkeleton : topRated}
          </Swiper>
        </div>
      </section>
      {/* End Top Rated Items */}
      {/* Start All Product */}
      <section className="contain py-10">
        <div className="border-b border-slate-500">
          <p className="text-xl text-slate-800 pb-3">Product</p>
        </div>
        <div className="relative flex justify-center items-center py-8">
          <input
            type="text"
            placeholder="Search . . . ."
            className="border border-slate-400 rounded text-slate-700 py-1 px-2 -me-8 w-[200px] md:w-[18rem] outline-none"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            onKeyDown={() => searchItem(filtering)}
          />
          <i className="fa-solid fa-search text-slate-400"></i>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? allProductSkeleton : allProducts}
        </div>
      </section>
      {/* End All Product */}
      <ToastMessage add={addItems} error={error} close={closeShopToast} closeError={closeErrorToast}/>
      <Footer />
    </>
  );
};

export default memo(Shop);
