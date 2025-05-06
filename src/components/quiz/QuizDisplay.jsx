import { useEffect, useState } from "react";
import { getQuiz, submitQuizResponses } from "../../services/quizServices";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByCategory } from "../../services/questionServices";

export const QuizDisplay = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const attempt = await getQuiz(quizId);
        setQuizAttempt(attempt);

        const allCategoryQuestions = await getQuestionsByCategory(
          attempt.category.id
        );
        const shuffled = allCategoryQuestions.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, attempt.question_count));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuiz();
  }, [quizId]);

  const handleAnswer = (questionId, answer) => {
    setResponses((prev) => {
      const filtered = prev.filter((r) => r.question !== questionId);
      return [
        ...filtered,
        {
          quizattempt: quizAttempt.id,
          question: questionId,
          user_answer: answer,
        },
      ];
    });
  };

  const handleSubmit = async () => {
    if (responses.length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      await submitQuizResponses(responses);
      navigate(`/myresults/${quizId}`);
    } catch (error) {
      alert("Failed to submit. Try again.");
    }
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="section">
      <div className="container">
        <div className="box has-background-dark-green has-text-white">
          <h1 className="title is-3 has-text-white mb-5">
            Quiz on {quizAttempt.category.name}
          </h1>

          {questions.map((question) => {
            const currentResponse = responses.find(
              (r) => r.question === question.id
            );

            return (
              <div
                key={question.id}
                className="box mb-4 has-background-white-ter"
              >
                <p className="subtitle is-5 has-text-dark">{question.body}</p>

                <div className="field">
                  <div className="control">
                    <label className="radio mr-4">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="true"
                        checked={currentResponse?.user_answer === true}
                        onChange={() => handleAnswer(question.id, true)}
                      />
                      <span className="ml-2 has-text-success">True</span>
                    </label>

                    <label className="radio">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="false"
                        checked={currentResponse?.user_answer === false}
                        onChange={() => handleAnswer(question.id, false)}
                      />
                      <span className="ml-2 has-text-danger">False</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="field is-grouped is-grouped-right mt-5">
            <button
              className="button is-primary is-dark-green is-medium"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
