import { Button, Radio } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../store/productSlice";

const Filter = () => {

  const [priceShow, setPriceShow] = useState(true);
  const [typeShow, setTypeShow] = useState(true);
  const [catogryShow, setCatogryShow] = useState(true);
  const [category, setCatogry] = useState('');
  const {loading, filtering} = useSelector(state => state.products);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCategory());
  // },[dispatch])

  // console.log(category);

  // const categoryItems = filtering?.map((category) => (
  //   <li>
  //     <Radio name="category" value={category} color="red" label={category} className="bg-red-500" onClick={() => setCatogry(category)} />
  //   </li>
  // ));

  return (
    <section className="absolute z-[600] bg-slate-500 top-full start-0 w-1/2 max-w-[90%] p-5">
      <ul className="top-[2rem] start-10">
        <p className="text-slate-800 font-bold">Filter Box</p>
        <li className="">
          <div
            className="ms-2 flex justify-between items-center cursor-pointer duration-500 text-white font-bold py-2 border-slate-600 border-b"
            onClick={() => setTypeShow(!typeShow)}
          >
            <p>Main Category</p>
            <i
              className={`fa-solid ${
                typeShow ? "fa-angle-up" : "fa-angle-down"
              } duration-500`}
            ></i>
          </div>
          {typeShow && (
            <ul className="bg-slate-300 mx-2 mt-3 mb-3 p-2 flex">
              {/*categoryItems*/}
            </ul>
          )}
        </li>
        <li className="">
          <div
            className="ms-2 flex justify-between items-center cursor-pointer duration-500 text-white font-bold py-2 border-slate-600 border-b"
            onClick={() => setCatogryShow(!catogryShow)}
          >
            <p>Type</p>
            <i
              className={`fa-solid ${
                catogryShow ? "fa-angle-up" : "fa-angle-down"
              }`}
            ></i>
          </div>
          {catogryShow && (
            <ul className="bg-slate-300 mx-2 mt-3 mb-3 p-2 flex">
              <li>
                <Radio name="catogrey" value="suite" id="suits" label="suits" />
              </li>
              <li>
                <Radio
                  name="catogrey"
                  value="jacket"
                  id="jacket"
                  label="jacket"
                />
              </li>
              <li>
                <Radio name="catogrey" value="shirt" id="shirt" label="shirt" />
              </li>
              <li>
                <Radio name="catogrey" value="shoes" id="shoes" label="shoes" />
              </li>
              <li>
                <Radio name="catogrey" value="dress" id="dress" label="dress" />
              </li>
            </ul>
          )}
        </li>
        <li className="">
          <div
            className={`ms-2 flex justify-between items-center cursor-pointer text-white font-bold py-2 ${
              priceShow && "border-b border-slate-600"
            }`}
            onClick={() => setPriceShow(!priceShow)}
          >
            <p>Price</p>
            <i
              className={`fa-solid ${
                priceShow ? "fa-angle-up" : "fa-angle-down"
              }`}
            ></i>
          </div>
          {priceShow && (
            <div className="bg-slate-300 mx-2 mt-3 mb-3 p-2">
              <Radio
                name="price"
                value="expensive"
                label="expensive"
                color="red"
              />

              <Radio name="price" value="normal" label="normal" />

              <Radio name="price" value="affordable" label="affordable" />
            </div>
          )}
        </li>
        <Button className="bg-slate-800 py-1 px-3 mt-3 font-normal duration-400 hover:bg-slate-900">
          filtering
        </Button>
      </ul>
    </section>
  );
};
export default Filter;

