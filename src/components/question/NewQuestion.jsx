import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  createNewQuestion,
  createCategoryInQuestion,
} from "../../services/questionServices";

export const NewQuestion = () => {
  const body = useRef();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // null by default, will be boolean
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  const handleCategoryChange = (e) => {
    const foundCategory = selectedCategories.find((selectedCategory) => {
      return selectedCategory.category_id === Number(e.target.id);
    });
    if (foundCategory) {
      const newCurrentCategory = selectedCategories.filter(
        (selectedCategory) => {
          return selectedCategory.category_id !== foundCategory.category_id;
        }
      );
      setSelectedCategories(newCurrentCategory);
    } else {
      const newCategory = {
        category_id: Number(e.target.id),
      };
      const addedCategories = [...selectedCategories, newCategory];
      setSelectedCategories(addedCategories);
    }
  };

  const handleAnswerChange = (e) => {
    // converting the string value to a boolean
    const value = e.target.value === "true";
    setSelectedAnswer(value);
  };

  const handleSaveQuestion = async (event) => {
    event.preventDefault();

    if (selectedAnswer === null) {
      alert("Please select an answer (True or False)");
      return;
    }

    const createdQuestion = {
      body: body.current.value,
      answer: selectedAnswer, 
    };

    const newQuestion = await createNewQuestion(createdQuestion);

    if (selectedCategories.length > 0 && newQuestion.id) {
      const categoriesInQuestionArray = selectedCategories.map((category) => ({
        question_id: newQuestion.id,
        category_id: category.category_id,
      }));
      await createCategoryInQuestion(categoriesInQuestionArray);
    }
    navigate(`/myquestions`);
  };

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSaveQuestion}>
        <h1 className="title">Create New Question</h1>

        <div className="field">
          <label className="label">Question</label>
          <div className="control">
            <input className="input" type="text" ref={body} />
          </div>
        </div>

        <div className="field">
          <label className="label">Categories</label>
          <div className="control">
            {categories.map((category) => {
              return (
                <div key={category.id} className="column is-4">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      id={category.id}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    {category.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="field">
          <label className="label">Answer</label>
          <div className="control">
            <div className="select">
              <select
                value={selectedAnswer === null ? "" : selectedAnswer.toString()}
                onChange={handleAnswerChange}
              >
                <option value="" disabled>
                  Select an answer
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field is-grouped mt-5">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              type="button"
              onClick={() => navigate("/myquestions")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
