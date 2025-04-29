declare module 'vue-signature-pad' {
  import { DefineComponent } from 'vue'
  const VueSignaturePad: DefineComponent<{
    width: string
    height: string
    options: {
      penColor: string
      backgroundColor: string
      minWidth: number
      maxWidth: number
      throttle: number
      minDistance: number
    }
  }>
  export { VueSignaturePad }
} 