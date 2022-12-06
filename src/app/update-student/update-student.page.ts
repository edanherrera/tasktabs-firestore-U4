import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';



@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {

  public student: Student;
  public myForm : FormGroup;
  public validationMessages: object;
  private id : string;
  public support : Student;
  constructor(private studentService : StudentService, private fb : FormBuilder, private router:Router, private activatedRoute: ActivatedRoute) {
    this.student = {
      controlnumber: "",
        age: 0,
        career: "",
        curp: "",
        email: "",
        name: "",
        nip: 0,
        photo: ""
    };
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      // this.student = this.studentService.getStudentByControlNumber(params.cn);
      this.studentService.getStudentById(params.id).subscribe(item =>{
        this.student = item as Student;
        this.support = item as Student;
        this.id = params.id;
      });
    });
    this.myForm = this.fb.group({
      controlnumber:["", Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name:["", Validators.required],
      curp:["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:["", Validators.compose([Validators.required, Validators.min(17)])],
      nip:["", Validators.compose([Validators.required, Validators.min(10)])],
      email:["", Validators.compose([Validators.required, Validators.email])],
      career:["", Validators.required],
      photo:["", Validators.compose([Validators.required])]
    });
    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "Debe capturar el número de control"},
        { type: 'minlength', message: "El número de control parece estar mal formado"},
        { type: 'pattern', message: "El número de control debe contener sólo números"}
      ],
      'name': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'curp': [
        { type: 'required', message: "Debe capturar la CURP"},
        { type: 'pattern', message: "La CURP parece estar mal formada"}
      ],
      'age': [
        { type: 'required', message: "Debe capturar la edad"},
        { type: 'min', message: "La edad es incorrecta"}
      ],
      'nip': [
        { type: 'required', message: "Debe capturar el NIP"},
        { type: 'min', message: "El NIP debe ser mayor a 9"}
      ],
      'email': [
        { type: 'required', message: "Debe capturar el email"},
        { type: 'email', message: "El email parece estar mal formado"}
      ],
      'career': [
        { type: 'required', message: "Debe capturar la carrera"}
      ],
      'photo': [
        { type: 'required', message: "Debe capturar la url de la fotografía"}
      ]
    };
  }

  public updateStudent(){
    //this.myForm.controls.controlnumber.setValue(this.student.controlnumber)

    // this.myForm.controls.controlnumber.setValue(this.support.controlnumber);
    // this.myForm.controls.name.setValue(this.support.name);
    // this.myForm.controls.curp.setValue(this.support.curp);
    // this.myForm.controls.age.setValue(this.support.age);
    // this.myForm.controls.nip.setValue(this.support.nip);
    // this.myForm.controls.email.setValue(this.support.email);
    // this.myForm.controls.photo.setValue(this.support.photo);
    // this.myForm.controls.career.setValue(this.support.career);

    // this.student = {
    //   controlnumber: this.myForm.controls.controlnumber.value,
    //   name: this.myForm.controls.name.value,
    //   curp: this.myForm.controls.curp.value,
    //   age: this.myForm.controls.age.value,
    //   nip: this.myForm.controls.nip.value,
    //   email: this.myForm.controls.email.value,
    //   photo: this.myForm.controls.photo.value,
    //   career: this.myForm.controls.career.value,
    // }
    this.studentService.updateStudent(this.student,this.id);
    this.back();
  }
  back():void{
    this.router.navigateByUrl('');
  }
}
