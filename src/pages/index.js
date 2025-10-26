import { useState, useEffect } from "react";
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
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resizing to: ", window.innerWidth);
      setWidth(window.innerWidth);
    }

    // Set initial width
    handleResize();

    // Update on resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
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
                <Answer basePath={basePath} viewportWidth={width}/>
              :
                <Question id={questionId} viewportWidth={width}/>
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
            direction={width <= 500 ? 'column' : 'row'}
          >
            <motion.div
              style={{
                width: width <= 500 ? '100%' : '40%',
                backgroundColor: 'black',
                height: width <= 500 ? '50vh' : '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ x: 0, width: width <= 500 ? '100%' : '40%', scale: 1 }}
              exit={{
                x: ["0%","-100%"],
                width: width <= 500 ? ["100%", "0%"]:["40%", "0%",],
                scale: [1,0],
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
                <Typography sx={{color: 'white', fontWeight: 800, fontSize: 'clamp(1rem, 2vw + 0.5rem, 2.5rem)', }} variant='h4'>
                  Match with the Prefect Stylist for you! Take the Quiz!
                </Typography>
                <Typography sx={{color: 'white', fontSize: width <= 500 ? 'clamp(1rem, 2vw + 0.5rem, 2.5rem)' : 'clamp(0.5rem, 1.5vw + 0.1rem, 2rem)' }} variant="h6">Discover which stylist is best suited for you!</Typography>
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
                position: "relative",
                width: width <= 500 ? "100%" : "60%",
                height: width <= 500 ? "50vh" : "100vh",
              }}
              initial={{ x: 0, width: width <= 500 ? '100%' : '60%', scale: 1 }}
              exit={width <= 500 ?{
                y: ["0%", "-50%", "-50%"],        // move left then back to center
                height: ['50vh', '100vh', '100vh'], // stay at 50% during slide, then expand
                scale: [1, 1.05, 1.1],          // optional subtle zoom
              } : {
                x: ["0%", "0%", "0%"],        // move left then back to center
                width: ["60%", "100%", "100%"],  // stay at 50% during slide, then expand
                scale: [1, 1.05, 1.1],   
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Stack 
                sx={{
                  position: "relative",
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${basePath}/landing.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&::after": width <= 500 ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "40%",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                    pointerEvents: "none",
                  } : {},
                }}
              />
            </motion.div>
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
