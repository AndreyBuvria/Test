import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit,OnDestroy {

  public form!: FormGroup;
  public submitted = false;

  public currentItem: any;

  private currLength!: number;
  private subscription!: Subscription;

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

    this.subscription = this.quizService.getLengthTests().subscribe(res => {
      this.currLength = res;
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

    console.log(this.getQuizzesGroups().value);
    console.log(this.form);

    const testForm = {
      topic: this.form.get('topic')!.value,
      quizzes: {...this.getQuizzesGroups().value},
      id: this.generateID(this.currLength,4),
    };

   /* this.subscription = this.quizService.createTest(testForm).subscribe(res => {
      console.log(res);
    });*/
    //console.log(testForm);

    this.submitted = false;
  }

  private generateID(count: number, lengthID: number) {
    //if(typeof(count) !== 'number') { return null; }

    let idTest = count.toString().split('');

    for(let i = 0; i < lengthID-1; i++) {
      if(idTest.length != lengthID) {
        idTest.unshift('0');
      }
    }
    return idTest.join('');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
