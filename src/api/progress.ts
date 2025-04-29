import { post } from '../utils/request'

interface SpeakingResult {
  userId: string;
  number: number;
  correct: boolean;
}

export const saveSpeakingResult = async (userId: string, number: number, correct: boolean) => {
  console.log('准备发送保存请求:', { userId, number, correct })
  try {
    const response = await post<SpeakingResult>('/progress/speaking', {
      userId,
      number,
      correct
    })
    console.log('保存成功:', response)
    return response
  } catch (error) {
    console.error('保存结果失败:', error)
    throw error
  }
} 