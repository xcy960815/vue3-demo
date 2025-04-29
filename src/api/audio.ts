
// 语音播放队列管理
class SpeechQueue {
  private queue: number[] = []
  private isPlaying: boolean = false
  private synthesis: SpeechSynthesis = window.speechSynthesis

  async add(number: number) {
    // 如果正在播放，先停止当前播放
    if (this.synthesis.speaking) {
      this.synthesis.cancel()
      // 等待一小段时间确保语音完全停止
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    this.queue.push(number)
    if (!this.isPlaying) {
      await this.processQueue()
    }
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.isPlaying = false
      return
    }

    this.isPlaying = true
    const number = this.queue.shift()!

    try {
      await this.playNumber(number)
      // 播放完成后等待一小段时间再继续下一个
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error('播放失败:', error)
      // 出错时暂停一下再继续
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    await this.processQueue()
  }

  private async playNumber(number: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('您的浏览器不支持语音合成'))
        return
      }

      // 确保之前的语音已经停止
      if (this.synthesis.speaking) {
        this.synthesis.cancel()
      }

      const utterance = new SpeechSynthesisUtterance(number.toString())
      utterance.lang = 'zh-CN'
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = (event) => {
        // 如果是被中断的错误，我们认为是正常的，继续处理
        if (event.error === 'interrupted') {
          resolve()
        } else {
          reject(new Error('语音合成失败: ' + event.error))
        }
      }

      // 添加一个小延迟再开始播放
      setTimeout(() => {
        try {
          this.synthesis.speak(utterance)
        } catch (error) {
          reject(error)
        }
      }, 50)
    })
  }

  clear() {
    this.queue = []
    if (this.synthesis.speaking) {
      this.synthesis.cancel()
    }
    this.isPlaying = false
  }
}

const speechQueue = new SpeechQueue()

export const playNumberAudio = async (number: number) => {
  await speechQueue.add(number)
}

export const stopSpeaking = () => {
  speechQueue.clear()
}

// 获取可用的语音列表
export const getVoices = () => {
  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let voices = window.speechSynthesis.getVoices()
    
    if (voices.length > 0) {
      resolve(voices)
      return
    }

    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices()
      resolve(voices)
    }
  })
} 