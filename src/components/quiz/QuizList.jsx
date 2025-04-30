import { useEffect, useState } from "react"
import { getquizzes } from "../../services/quizServices"
import { Link } from "react-router-dom"


export const QuizList=()=>{
    const [quizzes, setQuizzes]=useState([])

    useEffect(()=>{
        getquizzes().then((data)=>{
            console.log(data)
            setQuizzes(data)
        })
    },[])
    return <>
    <h1>Completed Quizzes</h1>
    <div>
     {quizzes.map((quiz)=>{
         return(
            <div key={quiz.id}>
                <Link to={`/myresults/${quiz.id}`} key={quiz.id} >{quiz.created_date}</Link> 
                <div>Quiz Category: {quiz.category.name}</div>
                <div># of Questions: {quiz.question_count}</div>
                <div>Score: {quiz.result}</div>
                </div>
         )
     })}
     </div>
    
    
    
    </>
}