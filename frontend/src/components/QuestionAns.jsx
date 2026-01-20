import Answer from "./Answer";

const QuestionAns = ({index,item}) => {
  return (

    <li key={index}>
      <strong>
        {item.role === "user" ? (
          <p className="text-right">You:</p>
        ) : (
          <p className="text-left">Ai:</p>
        )}
      </strong>
      <ul>
        {item.text.map((line, i) => (
          <li key={i}>
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
