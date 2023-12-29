
const ToastMessage = ({add, error, close, closeError}) => {

  return add ? (
    <div>
      <div
        className={`fixed bottom-5 start-10 ${
          add ? "opacity-100" : "opacity-0"
        } bg-slate-800 py-1 px-5 rounded border border-l-[5px] border-l-emerald-500 z-[350] transition-opacity ease-in-out delay-500 duration-500`}
      >
        <i
          className="fa-solid fa-times text-slate-400 absolute top-1 end-1 cursor-pointer"
          onClick={close}
        ></i>
        <div className="between py-4">
          <i className="fa-solid fa-check px-2 py-2 text-white bg-emerald-400 rounded-full border-[5px] border-emerald-100/80"></i>
          <p className="text-white ms-3">New item has been added to cart</p>
        </div>
      </div>
    </div>
  ) : error ? (
    <div className="relative">
      <div className="absolute -top-28 start-10 bg-slate-800 py-1 px-5 rounded border border-l-[5px] border-l-red-500 z-[350]">
        <i
          className="fa-solid fa-times text-slate-400 absolute top-1 end-1 cursor-pointer"
          onClick={closeError}
        ></i>
        <div className="between py-4">
          <i className="fa-solid fa-times px-3 py-3 text-white bg-red-500 rounded-full border-[8px] border-red-100"></i>
          <p className="text-slate-700 ms-3">
            Something wrong please try again
          </p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default ToastMessage;
