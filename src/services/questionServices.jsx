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