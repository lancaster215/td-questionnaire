import { useQuestionContext } from "@/hooks/useQuestionContext";
import { setReset } from "@/store/questionSlice/questionSlice";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Answer() {
    const { setQuestionId } = useQuestionContext()
    const { rating } = useSelector((state) => state.question)
    const dispatch = useDispatch()
    const [highestKey] = Object.entries(rating).reduce(
        (max, curr) => (curr[1] > max[1] ? curr : max),
        ["", -Infinity]
    );

    useEffect(() => {
        console.log(rating)
    }, [rating])

    return (
        <Stack
            sx={{ 
                bgcolor: 'linear-gradient(145deg,rgba(17, 18, 13, 0.7) 0%,rgba(30, 30, 30, 0.9) 40%,rgba(255, 255, 255, 0.08) 60%,rgba(17, 18, 13, 0.9) 100%)',
                backdropFilter: 'blur(4px)',
                maxWidth: '70%', 
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                padding: '100px',
                textAlign: 'center'
            }}
        >
            <Typography sx={{color: 'white', fontWeight: 800, textTransform: 'capitalize'}} variant='h4'>{highestKey}</Typography>
            <Stack 
                direction='row'
                spacing={2}
                sx={{
                    mt: '50px'
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
                >
                    {'Proceed'}
                </Button>
            </Stack>
        </Stack>
    )
}