export const getquizzes = async () => {
   
    const response = await fetch("http://localhost:8000/quizattempts",
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("user_token")).token}`
            }
        })
    const quizes = await response.json()
    return quizes}