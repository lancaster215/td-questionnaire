import { useQuestionContext } from "@/hooks/useQuestionContext";
import { setReset } from "@/store/questionSlice/questionSlice";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function Answer({ basePath }) {
    const { setQuestionId } = useQuestionContext()
    const { rating } = useSelector((state) => state.question)
    const dispatch = useDispatch()
    const [highestKey] = Object.entries(rating).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["", -Infinity]
    );
    const isMariah = highestKey.toLocaleLowerCase().includes('mariah')
    const isDennis = highestKey.toLocaleLowerCase().includes('dennis')
    const isRegina = highestKey.toLocaleLowerCase().includes('regina')
    const isTru = highestKey.toLocaleLowerCase().includes('tru')

    useEffect(() => {
        console.log(rating)
    }, [rating])

    return (
        <AnimatePresence mode="wait">
            <Stack 
                direction={'row'}
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <motion.div
                    key="answer-image"
                    initial={{ x: "100%", width: "40%", opacity: 0, scale: 1.05 }} // start offscreen to the right
                    animate={{
                        x: 0,
                        width: "40%",
                        opacity: 1,
                        scale: 1,
                    }} // slide to position
                    exit={{
                        x: "-100%",  // slide out to the left when leaving
                        opacity: 0,
                        scale: 0.95,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                >
                <Stack sx={{
                    backgroundImage: isMariah ? 
                    `url(${basePath}/mariah.jpg)` :
                    isDennis ?
                    `url(${basePath}/dennis.jpg)` : 
                    isRegina ?
                    `url(${basePath}/regina.jpeg)` : 
                    isTru && 
                    `url(${basePath}/tru.jpg)`,
                    height: '100vh',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: '100%',
                }}/>
                </motion.div>
                <Stack
                    sx={{ 
                        // bgcolor: 'linear-gradient(145deg,rgba(17, 18, 13, 0.7) 0%,rgba(30, 30, 30, 0.9) 40%,rgba(255, 255, 255, 0.08) 60%,rgba(17, 18, 13, 0.9) 100%)',
                        backdropFilter: 'blur(4px)',
                        width: '70%',
                        height: '70%',
                        WebkitBackdropFilter: 'blur(4px)',
                        // border: '1px solid rgba(255, 255, 255, 0.1)',
                        // borderRadius: 2,
                        // boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        padding: '100px',
                        textAlign: 'center',
                        // backgroundColor: 'blue',
                    }}
                >
                    <Typography sx={{color: 'white', fontWeight: 400}} variant='h4'>
                        You've been matched with <span style={{ fontWeight: 800, textTransform: 'capitalize'}}>{highestKey}</span> based on your preferences!
                    </Typography>
                    <Stack 
                        direction='row'
                        spacing={2}
                        sx={{
                            mt: '50px',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                border: '2px solid #90caf9',
                                backgroundColor: 'rgba(144, 202, 249, 0.2)',
                                color: 'white',
                                fontWeight: 700,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                            onClick={() => {
                                dispatch(setReset({
                                    mariah: 0,
                                    regina: 0,
                                    dennis: 0,
                                    tru: 0
                                }))
                                setQuestionId(1)
                            }}
                        >
                            {'Retry'}
                        </Button>
                        <Button
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                border: '2px solid #90caf9',
                                backgroundColor: 'rgba(144, 202, 249, 0.2)',
                                color: 'white',
                                fontWeight: 700,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                            onClick={() => {
                                if(isDennis || isMariah || isTru) {
                                    window.location.href = 'https://vagaro.com/texturedefined/staff';
                                } else if(isRegina) {
                                    window.location.href = 'https://www.vagaro.com/ginaslocs';
                                }
                                
                            }}
                        >
                            {'Book Now!'}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </AnimatePresence>
    )
}