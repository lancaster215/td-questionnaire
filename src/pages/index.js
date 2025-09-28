import { Stack } from "@mui/material";
import Question from "./questions/Question.jsx";
import { useQuestionContext } from "@/hooks/useQuestionContext.js";
import Answer from "./answer/Answer.jsx";

export default function Home() {
  const { questionId, questions } = useQuestionContext();
  return (
    <Stack 
      sx={{ 
        backgroundImage: "url('/bg.jpg')",
        height: '100vh',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {questions.length === questionId - 1 ? 
          <Answer/>
        :
          <Question id={questionId}/>
        }
        
    </Stack>
  )
}
