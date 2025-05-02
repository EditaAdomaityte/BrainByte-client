import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getQuestion,
  createCategoryInQuestion,
  updateQuestion,
  deleteCategoryInQuestion,
  getCategoriesInQuestion
} from "../../services/questionServices";

export const EditQuestion = () => {
  const [thisQuestion, setQuestion] = useState({body:""});
  const [categories, setCategories] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoriesChanged, setCategoriesChanged] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { questionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        getQuestion(questionId).then((data) => {
          const question = data[0];
          setQuestion(question);
          setSelectedAnswer(question.answer); // Set initial answer
        });
        getCategories().then((array) => {
          setCategories(array);
        });
        getCategoriesInQuestion(questionId).then((array) => setCurrentCategories(array));
      } catch (error) {
        console.error("Error fetching data:", error);
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
      (currentCategory) => currentCategory.categoryId === targetCategoryId
    );

    if (isCategoryAlreadySelected) {
      // Remove the category if it's already selected
      setCurrentCategories((prevCategories) =>
        prevCategories.filter((category) => category.categoryId !== targetCategoryId)
      );
    } else {
      // Add the category if it's not already selected
      const newCategory = {
        questionId: parseInt(questionId),
        categoryId: targetCategoryId,
      };

      setCurrentCategories((prevCategories) => [...prevCategories, newCategory]);
    }
  };

  const handleAnswerChange = (e) => {
    // Convert the string value to a boolean
    const value = e.target.value === "true";
    setSelectedAnswer(value);
  };

  const handleSaveQuestion = async (event) => {
    event.preventDefault();

    // Validate that an answer has been selected
    if (selectedAnswer === null) {
      alert("Please select an answer (True or False)");
      return;
    }

    const updatedQuestion = {
      body: thisQuestion.body,
      answer: selectedAnswer, // This will be a boolean (true or false)
    };

    await updateQuestion(questionId, updatedQuestion);
    await deleteCategoryInQuestion(questionId);
    await createCategoryInQuestion(currentCategories);
    
    navigate(`/myquestions`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleSaveQuestion}>
        <h1 className="title">Update Question</h1>

        <div className="field">
          <label className="label">Question</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={thisQuestion.body || ''}
              onChange={(event) => {
                const copy = { ...thisQuestion };
                copy.body = event.target.value;
                setQuestion(copy);
              }}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Categories</label>
          <div className="control">
            {categories.map((category) => (
              <div key={category.id} className="column is-4">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={currentCategories.some(
                      (currentCategory) => currentCategory.categoryId === category.id
                    )}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {category.name}
                </label>
              </div>
            ))}
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