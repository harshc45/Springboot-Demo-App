package com.example.SpringMongoProject.Controller;

import com.example.SpringMongoProject.Entity.Student;
import com.example.SpringMongoProject.Service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    @PostMapping(value="/save")
    private String saveStudent(@RequestBody Student students){
        studentServices.saveOrUpdate(students);
        return students.getId();
    }

    @GetMapping(value="/getAll")
    private Iterable<Student>getStudents(){
        return studentServices.listAll();
    }

    @PutMapping(value="/edit/{id}")
    private Student update(@RequestBody Student student, @PathVariable (name = "id") String _id){
        student.setId(_id);
        studentServices.saveOrUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteStudent(@PathVariable ("id") String _id){
        studentServices.deleteStudent(_id);
    }

    @RequestMapping("/search/{id}")
    private Student getStudents(@PathVariable(name="id") String studentId){
        return studentServices.getStudentById(studentId);
    }
}
