import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/productSlice";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SkeletonLoader from "../components/SkeletonLoader";

const Details = () => {
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="contain py-14 flex flex-col md:flex-row gap-16">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="">
              <img
                src={product?.image}
                alt="product"
                className="max-h-[500px]"
              />
            </div>
            <div>
              <h3 className="font-bold">{product?.title}</h3>
              <h4 className="text-4xl font-bold text-purple-500 py-3">
                ${product?.price}
              </h4>
              <div className="flex items-center mb-3 mt-0">
                <i
                  className={`fa-solid fa-star ${
                    product?.rating.rate >= 1
                      ? "text-yellow-400"
                      : "text-slate-400"
                  } mx-1 text-[13px]`}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    product?.rating.rate >= 2
                      ? "text-yellow-400"
                      : "text-slate-400"
                  } mx-1 text-[13px]`}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    product?.rating.rate >= 3
                      ? "text-yellow-400"
                      : "text-slate-400"
                  } mx-1 text-[13px]`}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    product?.rating.rate >= 4
                      ? "text-yellow-400"
                      : "text-slate-400"
                  } mx-1 text-[13px]`}
                ></i>
                <i
                  className={`fa-solid fa-star ${
                    product?.rating.rate >= 4.5
                      ? "text-yellow-400"
                      : "text-slate-400"
                  } mx-1 text-[13px]`}
                ></i>
              </div>
              <i className="text-slate-700 mt-5 block">
                <p className="text-slate-800 font-bold">Description</p>
                {product?.description}
              </i>
              <p className="text-purple-800 font-bold">{product?.brand}</p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Details;
