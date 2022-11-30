import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    this.student = 
      {
        controlnumber: '',
        age: 0,
        career: '',
        curp: '',
        email: '',
        name: '',
        nip: 0,
        photo: ''
      }
  }

  ngOnInit() {
    // let cn;
    this.activatedRoute.queryParams.subscribe((params) => {
      // this.student = this.studentService.getStudentByControlNumber(params.cn);
      this.studentService.getStudentById(params.id).subscribe(item =>{
        console.log(item);
        this.student = item as Student;
        
      });
    });
    // console.log(cn);
  }

}
