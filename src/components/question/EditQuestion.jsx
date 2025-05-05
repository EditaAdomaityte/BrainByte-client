import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getQuestion,
  createCategoryInQuestion,
  updateQuestion,
  deleteCategoryInQuestion,
  getCategoriesInQuestion,
} from "../../services/questionServices";

export const EditQuestion = () => {
  const [thisQuestion, setQuestion] = useState({ body: "", answer: null });
  const [allCategories, setAllCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoriesChanged, setCategoriesChanged] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { questionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const questionData = await getQuestion(questionId);

        if (questionData) {
          setQuestion({
            id: questionData.id,
            body: questionData.body || "",
            answer: questionData.answer,
          });

          if (
            questionData.categories &&
            Array.isArray(questionData.categories)
          ) {
            const formattedCategories = questionData.categories.map((cat) => ({
              question_id: parseInt(questionId),
              category_id: cat.id,
            }));
            setCurrentCategories(formattedCategories);
          }
        }
        const categoriesData = await getCategories();
        setAllCategories(categoriesData || []);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [questionId]);

  const handleCategoryChange = (event) => {
    setCategoriesChanged(true);

    const targetCategoryId = Number(event.target.id);
    const isCategoryAlreadySelected = currentCategories.some(
      (currentCategory) => currentCategory.category_id === targetCategoryId
    );

    if (isCategoryAlreadySelected) {
      // Removing the category if it's already selected
      setCurrentCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category.category_id !== targetCategoryId
        )
      );
    } else {
      // Adding the category if it's not already selected
      const newCategory = {
        question_id: parseInt(questionId),
        category_id: targetCategoryId,
      };

      setCurrentCategories((prevCategories) => [
        ...prevCategories,
        newCategory,
      ]);
    }
  };

  const handleAnswerChange = (e) => {
    // Converting the string value to a boolean
    const value = e.target.value === "true";
    setQuestion({
      ...thisQuestion,
      answer: value,
    });
  };

  const handleSaveQuestion = async (event) => {
    event.preventDefault();

    if (thisQuestion.answer === null) {
      alert("Please select an answer (True or False)");
      return;
    }

    const updatedQuestion = {
      body: thisQuestion.body || "",
      answer: thisQuestion.answer,
    };

    try {
      await updateQuestion(questionId, updatedQuestion);
      await deleteCategoryInQuestion(questionId);

      if (currentCategories && currentCategories.length > 0) {
        await createCategoryInQuestion(currentCategories);
      }

      navigate(`/myquestions`);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    }
  };


  if (isLoading) {
    return (
      <div className="section">
        <div className="container has-text-centered">
          <p className="title">Loading...</p>
          <progress className="progress is-primary" max="100"></progress>
        </div>
      </div>
    );
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSaveQuestion}>
        <h1 className="title">Update Question</h1>

        <div className="box">
          <div className="field">
            <label className="label">Question</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={thisQuestion.body || ""}
                onChange={(event) => {
                  setQuestion({
                    ...thisQuestion,
                    body: event.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Categories</label>
            <div className="control">
              <div className="columns is-multiline">
                {allCategories && allCategories.length > 0 ? (
                  allCategories.map((category) => (
                    <div key={category.id} className="column is-4">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={currentCategories.some(
                            (currentCategory) =>
                              currentCategory.category_id === category.id
                          )}
                          onChange={handleCategoryChange}
                          className="mr-2"
                        />
                        {category.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="column">No categories available</div>
                )}
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Answer</label>
            <div className="control">
              <div className="select">
                <select
                  value={
                    thisQuestion.answer === null
                      ? ""
                      : thisQuestion.answer.toString()
                  }
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
        </div>

        <div className="field is-grouped mt-5">
          <div className="control">
            <button className="button is-link" type="submit">
              Save Changes
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
