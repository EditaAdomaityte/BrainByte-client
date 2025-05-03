export const getresponses = async (quizId) => {
   
    const response = await fetch(`http://localhost:8000/quizresponses?quizattempt_id=${quizId}`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
            }
        })
    const questions = await response.json()
    return questions}

export const deleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:8000/questions/${questionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
                }
            });
            
            if (response.ok) {
                return { success: true, message: "Question deleted successfully" };
            } else {
                const errorData = await response.json();
                return { success: false, error: errorData.reason || "Failed to delete question" };
            }
        } catch (error) {
            console.error("Error deleting question:", error);
            return { success: false, error: "Network or server error occurred" };
        }
    }


export const getmyquestions = async (quizId) => {
   
    const response = await fetch(`http://localhost:8000/questions`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
            }
        })
    const questions = await response.json()
    return questions}

export const getCategories = async (quizId) => {
   
    const response = await fetch(`http://localhost:8000/categories`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
            }
        })
    const categories = await response.json()
    return categories}


export const createNewQuestion=async(question)=>{
    const response=await fetch("http://localhost:8000/questions",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
             Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
        },
        body: JSON.stringify(question)
    })
    return response.json()
}

export const createCategoryInQuestion=async(array)=>{
    for (const category of array){
        const newCategoryEntry={
          question_id: category.question_id,
          category_id: category.category_id,
        }
        await fetch(`http://localhost:8000/questioncategories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
          },
          body: JSON.stringify(newCategoryEntry),
        });
      }
    };


    export const getQuestion = async (questionId) => {
   
        const response = await fetch(`http://localhost:8000/questions/${questionId}`,
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
                }
            })
        const question = await response.json()
        return question} 
    

export const deleteCategoryInQuestion = async (questionId) => {
    await fetch(`http://localhost:8000/questioncategories/delete_by_question?question_id=${questionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`,
        },
      });
};

export const getCategoriesInQuestion=async(questionId)=>{
    const response = await fetch(`http://localhost:8000/questioncategories?question_id=${questionId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
        }
    })
    const categoriesInQuestion = await response.json()
        return categoriesInQuestion 
}

export const updateQuestion=async(questionId, updatedQuestion)=>{
    const response = await fetch(`http://localhost:8000/questions/${questionId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`,
    },
    body: JSON.stringify(updatedQuestion),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }}

