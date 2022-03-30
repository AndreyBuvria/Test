export interface Timer {
  display: string,
  minutes: number,
  seconds: number
}
export interface QuizForm {
  question: string,
  optionsAnswers: string[],
  markAnswer: number
}
/* */
export interface ResponseBody {
  expiresIn: string | number,
  idToken: string;
}
export interface PreviewData {
  topic: string,
  id: number
}
export interface DataResult {
  correct: number,
  uncorrect: number
}
