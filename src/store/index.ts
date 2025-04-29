import { defineStore } from 'pinia';
import type { UserProgress, Question } from '../types';

export const useStore = defineStore('main', {
    state: (): { userProgress: UserProgress } => ({
        userProgress: {
            userId: 'default',
            currentLesson: 1,
            coins: 0,
            completedNumbers: [],
            wrongQuestions: []
        }
    }),
    actions: {
        addCoins(amount: number) {
            this.userProgress.coins += amount;
        },
        completeNumber(number: number) {
            if (!this.userProgress.completedNumbers.includes(number)) {
                this.userProgress.completedNumbers.push(number);
            }
        },
        addWrongQuestion(questionId: number) {
            if (!this.userProgress.wrongQuestions.includes(questionId)) {
                this.userProgress.wrongQuestions.push(questionId);
            }
        }
    }
}); 