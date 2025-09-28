import { Stack } from "@mui/material";
import Question from "./questions/Question.jsx";
import { useQuestionContext } from "@/hooks/useQuestionContext.js";
import Answer from "./answer/Answer.jsx";
import getConfig from "next/config";

export default function Home() {
  const { questionId, questions } = useQuestionContext();
  const { publicRuntimeConfig = {} } = getConfig();
  const basePath = publicRuntimeConfig.basePath || "";

  return (
    <Stack 
      sx={{ 
        backgroundImage: `url(${basePath}/bg.jpg)`,
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
