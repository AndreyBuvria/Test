export interface Timer {
  display: string,
  minutes: number,
  seconds: number
}
export interface QuizForm {
  question: string,
  answers: string[],
  markAnswer: number
}
/* */
export interface ResponseBody {
  expiresIn: string | number,
  idToken: string;
}
