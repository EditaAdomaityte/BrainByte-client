export const getquizzes = async () => {
  const response = await fetch("http://localhost:8000/quizattempts", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
    },
  });
  const quizes = await response.json();
  return quizes;
};

export const createQuizAttempt = async (quizattempt) => {
  const response = await fetch("http://localhost:8000/quizattempts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("user_token")).token
      }`,
    },
    body: JSON.stringify(quizattempt),
  });
  return response.json();
};

export const getQuiz = async (quizId) => {
  const response = await fetch(
    `http://localhost:8000/quizattempts/${quizId}`,
    {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("user_token")).token
        }`,
      },
    }
  );
  const quiz = await response.json();
  return quiz;
};


export const submitQuizResponses = async (responses) => {
    const token = JSON.parse(localStorage.getItem("user_token")).token;
  
    const requests = responses.map((response) =>
      fetch("http://localhost:8000/quizresponses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(response),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to submit response for question ${response.question_id}`);
        }
        return res.json(); 
      })
    );
    return Promise.all(requests);
  };

  //this code is left for alternative option to send object into database one by one using for of loop
// export const submitQuizResponses=async(responses)=>{
//     for(const response of responses){
//         const res=await fetch('http://localhost:8000/quizresponses',{
//             method:"POST",
//             headers:{
//                 "Content-Type": "application/json",
//       Authorization: `Token ${
//         JSON.parse(localStorage.getItem("user_token")).token
//       }`,

//             }, body: JSON.stringify(response),
//         })
//         if (!res.ok) {
//             throw new Error(`Failed to submit response: ${res.status}`);
//           }
//     }
// }