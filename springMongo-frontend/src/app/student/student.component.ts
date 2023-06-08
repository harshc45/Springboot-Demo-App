import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  StudentArray : any[] =[];
  name: string = "";
  address: string = "";
  mobile: Number = 0;

  currentStudentID = "";

  constructor(private http: HttpClient){
    this.getAllStudent();
  }

  register(){
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "mobile" : this.mobile
    }

    this.http.post("http://localhost:8089/api/v1/student/save", bodyData, {responseType: "text"}).subscribe((resultData: any)=>{
    console.log(resultData);
    alert("Student Registered Succesfully!!");
    // this.getAllCustomer();

    this.name = "";
    this.address = "";
    this.mobile = 0;
    }
  );}

  getAllStudent(){
    this.http.get("http://localhost:8089/api/v1/student/getAll").subscribe((resultData: any)=>{
      console.log("resultData: ", resultData);
      this.StudentArray = resultData;
    });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8089/api/v1/student/delete/" + data.id , {responseType: 'text'}).subscribe((resultData: any)=>{
      console.log("Delete Record: ", resultData);
      alert("Student Deleted");
      this.getAllStudent();
      this.name = "";
      this.address = "";
      this.mobile = 0;
    });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.mobile = data.mobile;
    this.currentStudentID = data.id;
  }

  updateRecords(){
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "mobile" : this.mobile
    };

    this.http.put("http://localhost:8089/api/v1/student/edit/" + this.currentStudentID, bodyData, {responseType: 'text'}).subscribe((resultData: any)=>{
      console.log("Update Record: ", resultData);
      alert("Student Data Updated!");
      this.getAllStudent();

      this.name = '';
      this.address = '';
      this.mobile = 0;
    });
  }

  save(){
    if(this.currentStudentID == ""){
      this.register();
      this.getAllStudent();
    }
    else{
      this.updateRecords();
    }
  }

}
