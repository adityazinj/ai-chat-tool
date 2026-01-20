import { useEffect, useState, useRef } from "react";
import RecentSearch from "./components/RecentSearch";
import QuestionAns from "./components/QuestionAns";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState([
    JSON.parse(localStorage.getItem("history")) || [],
  ]);

  const [selectedHistory, setSelectedHistory] = useState(null);
  const scrollToAns = useRef();

  useEffect(() => {
    if (scrollToAns.current) {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }
  }, [result, typing]);

  useEffect(() => {
    if (selectedHistory) {
      setQuery(selectedHistory);
    }
  }, [selectedHistory]);

  const askQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    if (localStorage.getItem("history")) {
      let history = JSON.parse(localStorage.getItem("history"));
      history = [query, ...history];
      localStorage.setItem("history", JSON.stringify(history));
      setHistory(history);
    } else {
      localStorage.setItem("history", JSON.stringify([query]));
      setHistory([query]);
    }

    setQuery("");

    setTyping(true);
    const response = await fetch("https://ai-chat-tool.onrender.com/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: query }),
    });

    const data = await response.json();
    let dataReceive = data.reply;
    dataReceive = dataReceive.split("* ");
    dataReceive = dataReceive.map((item) => item.trim()); //removes extra space
    setTyping(false);

    setResult((prev) => [...prev, { role: "user", text: [query] }]);
    setResult((prev) => [...prev, { role: "ai", text: dataReceive }]);
  };
  const [darkMode, setDarkMode] = useState("dark");
  
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode == "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen text-center">
        <select
          onChange={(e) => setDarkMode(e.target.value)}
          className="fixed bottom-0 p-2 rounded-md m-4 outline-none
             border dark:border-zinc-800 border-zinc-500
             bg-zinc-500 dark:bg-zinc-800 dark:text-white"
        >
          <option value="dark" className="bg-zinc-800 text-white">
            Dark
          </option>
          <option value="light" className="bg-white text-black">
            Light
          </option>
        </select>
        <RecentSearch
          history={history}
          setHistory={setHistory}
          setSelectedHistory={setSelectedHistory}
          setQuery={setQuery}
          setResult={setResult}
        />

        <div className="col-span-4 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40">
            <h1
              className="font-bold font-sans text-3xl text-center
               bg-linear-to-r from-pink-500 via-pink-400 to-purple-500
               text-transparent bg-clip-text h-10"
            >
              Hello User, Ask me Anything
            </h1>
          </div>

          <div className="container h-120 pt-20">
            <div
              ref={scrollToAns}
              className="dark:text-zinc-300 text-zinc-800 overflow-auto h-full w-full p-15"
            >
              <ul>
                {result.map((item, index) => (
                  <QuestionAns key={index} index={index} item={item} />
                ))}
              </ul>
              {typing && (
                <p className="text-left italic dark:text-zinc-400 text-zinc-800 mt-4">
                  AI is typing...
                </p>
              )}
            </div>
          </div>

          <form
            action=""
            onSubmit={askQuery}
            className="dark:bg-zinc-800 bg-gray-100 w-1/2 m-auto dark:text-white text-zinc-800 flex p-1 pr-5 border rounded-full dark:border-zinc-700 border-zinc-400 shadow-sm shadow-zinc-500/50"
          >
            <input
              type="text"
              placeholder="Ask me anything"
              className="h-full w-full p-3 outline-none"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />

            <button className="cursor-pointer">Ask</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
