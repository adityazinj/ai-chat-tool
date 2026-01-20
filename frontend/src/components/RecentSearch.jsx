import deleteBlack from "../assets/delete.png";

const RecentSearch = ({history,setHistory,setSelectedHistory,setQuery,setResult}) => {


  const handleHistory = (e) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete the history?",
    );
    if (confirmDelete) {
      localStorage.removeItem("history");
      setHistory([]);
      setQuery("");
      setResult([]);
    } else {
      return;
    }
  };

  return (
    <div className="col-span-1 dark:bg-zinc-800 bg-zinc-500 dark:text-zinc-200 text-zinc-800 p-2">
      <div className="flex justify-center gap-3">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Chat<span className="text-blue-500">AI</span>
        </h1>
      </div>

      <ul className="p-4 flex flex-col gap-2">
        <ul className="flex justify-between mb-3 leading-tight tracking-tight">
          <li className="font-semibold">History :</li>
          <li className="w-5 cursor-pointer " onClick={handleHistory}>
            <img src={deleteBlack} alt="" />
          </li>
        </ul>
        {history &&
          history.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedHistory(item)}
              className="rounded-md dark:text-zinc-200 text-zinc-800 hover:dark:bg-zinc-700 hover:bg-zinc-400 transition text-start truncate whitespace-nowrap overflow-hidden cursor-pointer"
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
