import { useEffect, useState } from "react";
import { getquizzes } from "../../services/quizServices";
import { Link } from "react-router-dom";

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getquizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-3 mb-5">Completed Quizzes</h1>

        <div className="columns is-multiline">
          {quizzes.map((quiz) => (
            <div className="column is-one-third" key={quiz.id}>
              <div className="card quiz-card">
                <div className="card-content">
                  <p className="title is-5">
                    <Link
                      to={`/myresults/${quiz.id}`}
                      style={{ color: "rgb(34, 78, 60)" }}
                    >
                      {quiz.created_date}
                    </Link>
                  </p>
                  <p>
                    Category: <strong>{quiz.category.name}</strong>
                  </p>
                  <p>
                    Questions: <strong>{quiz.question_count}</strong>
                  </p>
                  <p>
                    Score: <strong>{quiz.result}%</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
