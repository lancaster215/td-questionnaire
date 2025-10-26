import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Question from "./questions/Question.jsx";
import { useQuestionContext } from "@/hooks/useQuestionContext.js";
import Answer from "./answer/Answer.jsx";
import getConfig from "next/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { questionId, questions } = useQuestionContext();
  const { publicRuntimeConfig = {} } = getConfig();
  const basePath = publicRuntimeConfig.basePath || "";
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  return(
    <AnimatePresence mode="wait">
      {openQuestionnaire ? (
        <motion.div
          key="questionnaire"
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Stack 
            sx={questions.length === questionId - 1 ? {
              backgroundColor: 'black'
            }:{ 
              backgroundImage: `url(${basePath}/landing.jpg)`,
              height: '100vh',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {questions.length === questionId - 1 ? 
                <Answer basePath={basePath}/>
              :
                <Question id={questionId}/>
              }
              
          </Stack>
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Stack 
            sx={{
              width: '100%',
            }}
            direction={'row'}
          >
            <motion.div
              style={{
                width: '40%',
                backgroundColor: 'black',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ x: 0, width: "40%", scale: 1 }}
              exit={{
                x: ["0%","-100%"],        // move left then back to center
                width: ["40%", "0%",],  // stay at 50% during slide, then expand
                scale: [1,0],          // optional subtle zoom
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Stack
                sx={{
                  textAlign: 'center',
                  paddingX: '20px',
                  alignItems: 'center'
                }}
                gap="20px"
              >
                <Typography sx={{color: 'white', fontWeight: 800}} variant='h4'>
                  Match with the Prefect Stylist for you! Take the Quiz!
                </Typography>
                <Typography sx={{color: 'white'}} variant="h6">Discover which stylist is best suited for you!</Typography>
                <Button
                  sx={{
                    backgroundColor: '#0070f3',
                    borderRadius: '50px',
                    width: '50%',
                    color: 'white',
                    border: '2px solid #90caf9',
                    backgroundColor: 'rgba(144, 202, 249, 0.2)',
                    color: 'white',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    width: '200px',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  onClick={() => setOpenQuestionnaire(!openQuestionnaire)}
                >
                  Book Now!
                </Button>
              </Stack>
            </motion.div>
            <motion.div
              style={{
                width: "60%",
                height: "100vh",
                backgroundImage: `url(${basePath}/landing.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              initial={{ x: 0, width: "60%", scale: 1 }}
              exit={{
                x: ["0%", "0%", "0%"],        // move left then back to center
                width: ["60%", "100%", "100%"],  // stay at 50% during slide, then expand
                scale: [1, 1.05, 1.1],          // optional subtle zoom
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
