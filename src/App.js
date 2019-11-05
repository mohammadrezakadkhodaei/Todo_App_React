import React, {useState, useEffect} from 'react';
import Students from './component/students/students';
import Button from './component/UI/button/button';
import NewStudent from './component/students/newStudent/newStudent';
import Toolbar from './containers/Header/Toolbar/Toolbar';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';

const App = () => {
  const [studentsState,setStudents] = useState([
    {id: 0, name: 'shahin', classNumber: 204, phoneNumber: 1234, email: 'shahin.kadkhdoaei@gmail.com'},
    {id: 1, name: 'komeil', classNumber: 2045, phoneNumber: 12345, email: 'komeil.mehranfar@gmail.com'},
    {id: 2, name: 'pooya', classNumber: 20456, phoneNumber: 12346, email: 'pooya.behtarino@gmail.com'},
    {id: 3, name: 'reza', classNumber: 204567, phoneNumber: 12347, email: 'ghilam.abbasi@gmail.com'},
  ])
  
  const [arrayeHolder,setArrayeHolder] = useState([]);
  const [toggle,setToggle] = useState(false);
  const [searchBarValue,setSearchBarValue] = useState('');
  const [studentName,setStudentName] = useState('');
  const [studentClass,setStudentClass] = useState('');
  const [studentPhoneNumber,setStudentPhoneNumber] = useState('');
  const [studentEmail,setStudentEmail] = useState('');
  
  useEffect(() => {
    setArrayeHolder(studentsState)
  },[]);
  
  const nameChangeHandler = (event,id)=>{
    const studentIndex = studentsState.findIndex(student=>{
      return student.id === id;
    })
    // console.log(studentIndex);
    const student = {...studentsState[studentIndex]};
    student.name = event.target.value;
    const students = [...studentsState];
    students[studentIndex]= student;
    setStudents(students);
  }

  const deleteStudent = (index) =>{
    const students = [...studentsState]
    students.splice(index,1)
    setStudents(students)
  }

  const toggleHandler = () =>{
    setToggle(!toggle)
  }

  const searchFilterFunction = (event) =>{
      const itemData = arrayeHolder.filter((item)=> {
      const itemData = item.name.toUpperCase();
      const textData = event.target.value.toUpperCase();
      return itemData.indexOf(textData)>-1
    })
    setStudents(itemData)
    setSearchBarValue(event.target.value)
  }

  const studentNameHandler = (event) =>{
    setStudentName(event.target.value);
  }
  
  const studentClassHandler = (event) =>{
    setStudentClass(event.target.value);
  }

  const studentPhoneNumberHandler = (event) =>{
    setStudentPhoneNumber(event.target.value);
  }

  const studentEmailHandler = (event) =>{
    setStudentEmail(event.target.value)
  }

  const addStudent = () =>{
    const newStudentsState = [...studentsState];
    newStudentsState.push({
      'id':studentsState.length,
      'name':studentName,
      'classNumber':studentClass,
      'phoneNumber':studentPhoneNumber,
      'email':studentEmail
    })
    setStudents(newStudentsState);
    setStudentName('');
    setStudentClass('');    
    setStudentPhoneNumber('');   
    setStudentEmail('');        
  }

  return(
    <BrowserRouter>
      <div className="container">
        <Toolbar/>
        <br/>
        <NewStudent
          studentName={studentName}
          studentClass={studentClass}
          studentPhoneNumber={studentPhoneNumber}
          studentEmail={studentEmail}
          studentNameHandler={studentNameHandler}
          studentClassHandler={studentClassHandler}
          studentPhoneNumberHandler={studentPhoneNumberHandler}
          studentEmailHandler={studentEmailHandler}
          addStudent={addStudent}
        />
        <input style={{marginTop: '80px'}} type="text" value={searchBarValue} onChange={searchFilterFunction} />
        
        <br/>
        <div className="alignCenter">
          <Button
          btnType="Success"
          clicked={toggleHandler}
          >
            تغییر وضعیت نمایش
          </Button>
        </div>

        <Students
        studentsList = {studentsState}
        nameChanged = {nameChangeHandler}
        deleted = {deleteStudent}
        toggle = {toggle}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;
