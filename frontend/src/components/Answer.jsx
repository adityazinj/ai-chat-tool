import React, { useEffect, useState } from "react";
import { checkHeading, checkHeadingStars } from "../helper";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Answer = ({ ans, totalResult, index, role, loading }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  const isUser = role === "user";

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(checkHeadingStars(ans));
    } else {
      setHeading(false);
      setAnswer(ans);
    }
  }, [ans]);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          pretag="div"
        ></SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"} pb-3 md:pb-5 px-md:px-0`}
    >
      {index == 0 && totalResult > 1 ? (
        <span className="text-base md:text-lg font-semibold dark:text-white text-zinc-800 max-w-[90%] md:max-w-[70%]">
          {answer}
        </span>
      ) : heading ? (
        <span className="font-semibold text-sm md:text-base dark:text-white text-zinc-800 max-w-[90%] md:max-w-[70%]">
          {answer}
        </span>
      ) : (
        <span className="ml-3 md:ml-8 text-sm md:text-base max-w-[90%] md:max-w-[70%] wrap-break-words">
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
      )}
    </div>
  );
};

export default Answer;
