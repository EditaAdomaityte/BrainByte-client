import { useEffect, useRef, useState } from "react";
import { createQuizAttempt } from "../../services/quizServices";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/questionServices";

export const NewQuiz = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const number = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const handleSaveQuizAttempt = async (event) => {
    event.preventDefault();
    if (!selectedCategory || selectedCategory === "Select Category") {
      alert("Please select a Category");
      return;
    }
    if (!number.current.value || isNaN(number.current.value)) {
      alert("Please enter a valid number of questions");
      return;
    }

    const createdQuizAttempt = {
      category: Number(selectedCategory),
      question_count: Number(number.current.value),
    };
    const NewQuiz = await createQuizAttempt(createdQuizAttempt);
    navigate(`/quiz/${NewQuiz.id}`);
  };

  return (
    <>
      <section className="columns is-centered">
        <form className="column is-two-thirds" onSubmit={handleSaveQuizAttempt}>
          <h1 className="title">Start New Quiz</h1>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select
                className="input"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="Select Category">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label"># of Questions: </label>
            <div className="control">
              <input className="input" type="text" ref={number} />
            </div>
          </div>

          <div className="field is-grouped mt-5">
            <div className="control">
              <button className="button is-link" type="submit">
                Start Quiz
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                type="button"
                onClick={() => navigate("/myresults")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
