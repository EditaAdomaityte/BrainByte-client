import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteQuestion,
  getmyquestions,
} from "../../services/questionServices";

export const QuestionList = () => {
  const [myQuestions, setMyQuestions] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const data = await getmyquestions();
      setMyQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      setIsDeleting(true);
      const result = await deleteQuestion(questionId);

      if (result.success) {
        // Fetching questions again from the server
        await fetchQuestions();

      } else {
        console.error("Failed to delete question:", result.error);
      }
    } catch (error) {
      console.error("Error in delete operation:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <button
          onClick={() => {
            navigate(`/newquestion`);
          }}
          className="button is-big is-primary is-light"
        >
          Create a Question
        </button>
        <h1 className="title has-text-centered is-3 mb-5">My Questions</h1>

        <div className="columns is-multiline">
          {myQuestions.map((question) => (
            <div className="column is-half" key={question.id}>
              <div
                className="card quiz-card is-flex is-flex-direction-column"
                style={{ height: "100%" }}
              >
                <div className="card-content is-flex-grow-1">
                  <p>
                    Question: <strong>{question.body}</strong>
                  </p>
                  <p>
                    Categories:{" "}
                    <strong>
                      {question?.categories?.map((cat, index) => (
                        <span key={cat.id}>
                          {cat.name}
                          {index < question.categories.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </strong>
                  </p>

                  <p>
                    Answer:{" "}
                    <strong>{question.answer ? "True" : "False"}</strong>
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate(`/myquestions/${question.id}/edit`);
                  }}
                  className="button is-small is-primary is-light"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(question.id)}
                  className="button  is-small is-danger is-light"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
