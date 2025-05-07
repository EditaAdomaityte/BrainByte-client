import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import { NewQuestion } from './question/NewQuestion.jsx'
import { QuestionList } from './question/QuestionList.jsx'
import { QuizList } from './quiz/QuizList.jsx'
import { QuizDetails } from './quiz/QuizDetails.jsx'
import { NewQuiz } from './quiz/NewQuiz.jsx'
import { QuizDisplay } from "./quiz/QuizDisplay.jsx"
import { EditQuestion } from "./question/EditQuestion.jsx"
import Home from "../pages/Home.jsx"
import { Register } from "../pages/Register.jsx"
import { Admin } from "./question/Admin.jsx"


export const ApplicationViews = () => {

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route index element={<Home />} />
                <Route path="myquestions">
                    <Route index element={<QuestionList />} />
                    <Route path=":questionId/edit" element={<EditQuestion />}/>
                </Route>
                <Route path="newquestion" element={<NewQuestion />} />
                <Route path="admin" element={<Admin />} />
                <Route path="myresults">
                    <Route index element={<QuizList />} />
                    <Route path=":quizId" element={<QuizDetails />} />
                </Route>
                <Route path="quiz">
                    <Route index element={<NewQuiz />} />
                    <Route path=":quizId" element={<QuizDisplay />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}