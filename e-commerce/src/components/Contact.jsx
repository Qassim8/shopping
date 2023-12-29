const Contact = () => {
  return (
    <>
      <section className=" bg-purple-800/80 py-16">
        <div className="contain flex justify-between flex-col md:flex-row gap-5 ">
          <div>
            <div className="mb-5">
              <p className="text-[14px] text-purple-200">
                Keep In Touch With Us
              </p>
              <h2 className="text-slate-100 font-bold text-4xl">Contact Us</h2>
            </div>
            <div className=" mt-10">
              <div className="flex mb-5 text-white">
                <i className="fa-solid fa-location text-purple-200 me-2 mt-1"></i>
                <p>UEA - Prince Rashid street, build no.25</p>
              </div>
              <div className="flex mb-5 text-white">
                <i className="fa-solid fa-clock text-purple-200 me-2 mt-1"></i>
                <p>work hour : from 8:00am to 10:00pm</p>
              </div>
              <div className="flex text-white">
                <i className="fa-solid fa-phone text-purple-200 me-2 mt-1"></i>
                <p>+967-5875-23-157</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 w-full p-8">
            <form>
              <div className="flex justify-between flex-col md:flex-row items-center md:gap-8">
                <input
                  type="text"
                  className="w-full p-2 bg-transparent border border-purple-500 mb-2 md:my-3"
                  placeholder="Enter Name"
                />
                <input
                  type="email"
                  className="w-full p-2 bg-transparent border border-purple-500 mb-2 md:my-3"
                  placeholder="Enter Email"
                />
              </div>
              <textarea
                className="w-full h-40 p-2 mb-3 bg-transparent border border-purple-500 resize-none"
                placeholder="Write Message For Us"
              ></textarea>
              <button className="w-full py-2 text-white bg-purple-500 no-underline hover:text-purple-500 hover:bg-white border hover:border-purple-500 duration-200">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
