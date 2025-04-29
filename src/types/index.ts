export interface Question {
    id: number;
    type: 'addition' | 'subtraction' | 'multiplication' | 'division';
    num1: number;
    num2: number;
    answer: number;
    options: number[];
    content: string;
    audioUrl?: string;
    correctAnswer: string;
    imageUrl?: string;
}

export interface UserProgress {
    userId: string;
    currentLesson: number;
    coins: number;
    completedNumbers: number[];
    wrongQuestions: number[];
}

export interface Lesson {
    id: number;
    title: string;
    numbers: number[];
    questions: Question[];
} 