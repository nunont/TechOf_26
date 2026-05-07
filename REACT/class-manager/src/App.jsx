import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './App.css'

import db from "./firestore";
import { useEffect, useState, useRef } from 'react';

function App() {
  const coursesRef = collection(db, "courses");

  const [courses, setCourses] = useState([]);
  const nameRef = useRef();

  const loadCourses = () => {
    getDocs(coursesRef)
      .then(snapshot => setCourses(snapshot.docs.map(d => ({ ...d.data(), id: d.id }))))
      .catch(console.error);
  };

  useEffect(loadCourses, []);

  const addCourse = async () => {
    await addDoc(coursesRef, { name: nameRef.current.value });
    nameRef.current.value = "";
    loadCourses();
  };

  const updateCourse = async (id, newName) => {
    if (!newName) return;
    await updateDoc(doc(db, "courses", id), { name: newName });
    loadCourses();
  };

  return (
    <>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} | {course.nrStudents}
            <input
              type="text"
              placeholder="New Name"
              onBlur={e => updateCourse(course.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <input ref={nameRef} type="text" placeholder="Course Name" />
      <button onClick={addCourse}>Add Course</button>
    </>
  )
}

export default App
