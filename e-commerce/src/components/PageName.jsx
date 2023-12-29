const PageName = ({ pageName, icon }) => {
  return (
    <>
      <div className="py-24 bg-slate-200 text-center">
        <i className={`fa-solid ${icon} fa-3x`}></i>
        <h2 className="text-2xl mt-3 text-slate-700">{pageName}</h2>
      </div>
    </>
  );
};
export default PageName;
