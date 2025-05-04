export const getquizzes = async () => {
   
    const response = await fetch("http://localhost:8000/quizattempts",
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
            }
        })
    const quizes = await response.json()
    return quizes}

    export const createQuizAttempt = async (quizattempt) => {
   
        const response = await fetch("http://localhost:8000/quizattempts",
            {   method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
                },
                body: JSON.stringify(question)
            })
            return response.json()}