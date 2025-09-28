import { useQuestionContext } from '@/hooks/useQuestionContext';
import { goBack } from '@/store/questionSlice/questionSlice';
import { Button, List, ListItemButton, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

function Question({ id }) {
    const dispatch = useDispatch()
    const { questions, answers, setAnswer, setQuestionId, questionId, } = useQuestionContext();
    const question = questions.find((q) => q.id === id);

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
                padding: '100px'
            }}
        >
            <Typography sx={{color: 'white', fontWeight: 800}} variant='h4'>{question?.questionText}</Typography>
            <List>
                {question?.options.map((opt) => {
                    const selected = answers[question.id] === opt.optionValue;
                    return (
                        <ListItemButton
                            key={opt.id}
                            onClick={() => setAnswer(question.id, opt.optionValue)}
                            sx={{
                                mb: 2,
                                borderRadius: 2,
                                border: selected
                                ? '2px solid #90caf9'
                                : '2px solid rgba(255,255,255,0.2)',
                                backgroundColor: selected
                                ? 'rgba(144, 202, 249, 0.2)'
                                : 'transparent',
                                color: 'white',
                                fontWeight: 700,
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                },
                            }}
                            >
                            {opt.optionText}
                        </ListItemButton>
                    )
                })}
            </List>
            {questionId > 1 &&
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
                        dispatch(goBack())
                        setQuestionId(questionId - 1)
                    }}
                >
                    {'Go Back'}
                </Button>
            }
        </Stack>
    )
}

export default Question;