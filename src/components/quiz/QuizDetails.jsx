import { useState } from "react"
import { useEffect } from "react"
import { getresponses } from "../../services/questionServices"
import { useParams } from "react-router-dom"


export const QuizDetails=()=>{

    const [questions, setQuestions]=useState([])
    const [quiz, setQuiz]=useState()
    const { quizId } = useParams();


    useEffect(()=>{
        getresponses(Number(quizId)).then((data)=>{
            console.log(data);
            setQuestions(data)
        })
    },[])


    return (
        <section className="section">
          <div className="container">
            <h1 className="title has-text-centered is-3 mb-5">Quiz Details</h1>
    
            <div className="box has-background-light mb-5">
              <p className="subtitle is-5"><strong>Quiz Date:</strong> {/* Add date here */}</p>
              <p className="subtitle is-5"><strong>Quiz Category:</strong> {/* Add category here */}</p>
              <p className="subtitle is-5"><strong>Result:</strong> {/* Add score here */}</p>
            </div>
    
            {questions.map((question, index) => (
              <div className="card mb-4" key={question.id}>
                <div className="card-content">
                    <p className="title is-5">Question {index + 1}:</p>
                 
                  <p className="mb-3"><strong>{question.question.body}</strong></p>
    
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span className={question.user_answer ? "has-text-success" : "has-text-danger"}>
                      {question.user_answer ? "True" : "False"}
                    </span>
                  </p>
                  <p>
                    <strong>Correct Answer:</strong>{" "}
                    <span className={question.question.answer ? "has-text-success" : "has-text-danger"}>
                      {question.question.answer ? "True" : "False"}
                    </span>
                  </p>
                  <p className={`mt-3 has-text-weight-semibold ${question.is_correct ? "has-text-success" : "has-text-danger"}`}>
                    {question.is_correct ? "Correct!" : "Incorrect"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    };