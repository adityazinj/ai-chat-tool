import Answer from "./Answer";

const QuestionAns = ({ index, item }) => {
  return (
    <li key={index} className="mb-4 md:mb-6 px-2 md:px-0">
      <strong>
        {item.role === "user" ? (
          <p className="text-right text-xs md:text-sm text-zinc-500">
            You:
          </p>
        ) : (
          <p className="text-left text-xs md:text-sm text-zinc-500">
            AI:
          </p>
        )}
      </strong>

      <ul className="mt-1 md:mt-2">
        {item.text.map((line, i) => (
          <li key={i} className="w-full">
            <Answer
              ans={line}
              role={item.role}
              totalResult={item.text.length}
              index={i}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default QuestionAns;
