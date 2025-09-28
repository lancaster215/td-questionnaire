import { setRating } from "@/store/questionSlice/questionSlice";
import { createContext, useContext, useState } from "react"
import { useDispatch } from "react-redux"

export const QuestionContext = createContext(undefined)

export const QuestionProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [questions] = useState([
        {
            id: 1,
            questionText: 'Which service are you most interested in booking?',
            options: [
                { id: 1, optionText: 'A sleek silk press', optionValue: 'silk-press' },
                { id: 2, optionText: 'Healthy loc maintenance or braids', optionValue: 'loc-braids' },
                { id: 3, optionText: 'Twisted Protective styles, defined curls, or textured protective styling (including rod sets)', optionValue: 'protective-styling' },
                { id: 4, optionText: 'A Precision haircut or shaping', optionValue: 'precision-haircut' },
                { id: 5, optionText: 'My dream hair color (lightening/permanent)', optionValue: 'hair-color' }
            ]
        },
        {
            id: 2,
            questionText: 'How do you prefer to work with your stylist?',
            options: [
                { id: 1, optionText: 'I know exactly what I want—just execute it.', optionValue: 'exact-want' },
                { id: 2, optionText: 'I like to collaborate and get input.', optionValue: 'collaborate' },
                { id: 3, optionText: 'I prefer to let the stylist take creative freedom.', optionValue: 'stylist-freedom' },
            ]
        },
        {
            id: 3,
            questionText: 'Which best describes your hair goals?',
            options: [
                { id: 1, optionText: 'I want to have my hair relaxed with a chemical service', optionValue: 'chemical-service' },
                { id: 2, optionText: 'I want to maintain my natural texture.', optionValue: 'maintain-natural' }
            ]
        }
    ])

    const [answers, setAnswers] = useState({});
    const [questionId, setQuestionId] = useState(1)

    const setAnswer = (id, answer) => {
        setAnswers((prev) => ({ ...prev, [id]: answer }));
        setQuestionId((prev) => prev + 1)

        switch(answer) {
            case 'silk-press': 
                dispatch(setRating({
                    mariah: 1,
                    regina: 0.75,
                    dennis: 0.5,
                    tru: 0.25,
                }))
                break;
            case 'loc-braids':
                dispatch(setRating({
                    mariah: 0,
                    regina: 1,
                    dennis: 0,
                    tru: 0,
                }))
                break;
            case 'protective-styling':
                dispatch(setRating({
                    mariah: 0.75,
                    regina: 0.5,
                    dennis: 0.25,
                    tru: 1,
                }))
                break;
            case 'precision-haircut':
                dispatch(setRating({
                    mariah: 1,
                    regina: 0.75,
                    dennis: 0.5,
                    tru: 0
                }))
                break;
            case 'hair-color':
                dispatch(setRating({
                    mariah: 1,
                    regina: 0.75,
                    dennis: 0.5,
                    tru: 0
                }))
                break;
            case 'exact-want':
                dispatch(setRating({
                    mariah: 0.75,
                    regina: 0.25,
                    dennis: 0,
                    tru: 1
                }))
                break;
            case 'collaborate':
                dispatch(setRating({
                    mariah: 1,
                    regina: 0.75,
                    dennis: 0.5,
                    tru: 0.25
                }))
                break;
            case 'stylist-freedom':
                dispatch(setRating({
                    mariah: 1,
                    regina: 0.5,
                    dennis: 0.75,
                    tru: 0
                }))
                break;
            case 'chemical-service':
                dispatch(setRating({
                    mariah: 0,
                    regina: 1,
                    dennis: 0,
                    tru: 0
                }))
                break;
            case 'maintain-natural':
                dispatch(setRating({
                    mariah: 0.75,
                    regina: 0.5,
                    dennis: 0.25,
                    tru: 1
                }))
                break;
        }
    };

    return (
        <QuestionContext.Provider value={{ questions, answers, setAnswer, questionId, setQuestionId }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestionContext = () => {
    const context = useContext(QuestionContext);
    if (!context) throw new Error("useQuestionContext must be used inside QuestionProvider");
    return context;
}