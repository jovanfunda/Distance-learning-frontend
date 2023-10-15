export interface Question {
    question: string,
    rightAnswer: string,
    wrongAnswer1: string,
    wrongAnswer2: string,
    wrongAnswer3: string,
    selectedAnswer: string | null;
    answers: string[] | null;
}