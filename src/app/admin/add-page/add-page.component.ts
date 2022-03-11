import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuizForm } from 'src/app/shared/interfaces';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  public form!: FormGroup;
  public submitted = false;

  public currentItem: any;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      topic: new FormControl('', Validators.required),
      quizzes: new FormArray([
        new FormGroup({
          question: new FormControl('Question', Validators.required),
          optionsAnswers: new FormArray([
            new FormControl('Option 1', Validators.required),
          ]),
          markAnswer: new FormControl('', Validators.required),
        }),

      ])
    });
  }

  public getQuizzesGroups(): FormArray{
    return this.form.get('quizzes') as FormArray;
  }
  public getFormsOptionsControls(idQuiz: number): FormArray {
    return this.getQuizzesGroups()['controls'][idQuiz].get('optionsAnswers') as FormArray;
  }


  public addOption(idQuiz: number) {
    if(this.getFormsOptionsControls(idQuiz)['controls'].length === 4) {
      return;
    } else {
      const control = new FormControl(`Option ${this.getFormsOptionsControls(idQuiz).length+1}`, Validators.required);
      this.getFormsOptionsControls(idQuiz)['controls'].push(control);
    }
  }

  public removeOption(idQuiz: number,idOption: number) {
    if(this.getFormsOptionsControls(idQuiz)['controls'].length !== 1) {
      this.getFormsOptionsControls(idQuiz).removeAt(idOption);
    }
  }

  public markOption(option: any,idQuiz:number,idOption: number) {
    this.currentItem = option;
    this.getQuizzesGroups()['controls'][idQuiz].patchValue({markAnswer: idOption});

    //console.log(this.getQuizzesGroups()['controls'][idQuiz]);
  }

  public addNewQuiz() {
    const quiz = new FormGroup({
      question: new FormControl('Question', Validators.required),
      optionsAnswers: new FormArray([
        new FormControl('Option 1', Validators.required),
      ]),
      markAnswer: new FormControl('', Validators.required)
    });

    this.getQuizzesGroups().push(quiz);
  }

  public submit() {
    this.submitted = true;

    const testForm = {
      topic: this.form.get('topic')!.value,
      quizzes: {...this.getQuizzesGroups().value}
    };

    this.quizService.createTest(testForm).subscribe(res => {
      console.log(res);
    })
  }

}
