import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './Tracker/Header'
import Exercises from './Tracker/Exercises'
import Sessions from './Tracker/Sessions'
import Search from './SearchPage/Search'
import './index.css'
import Navbar from './Navbar'
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';






function App() {


  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [sessions, setSessions] = useState([]);


  // color themes 
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });


  // load
  useEffect(() => {
    const data = localStorage.getItem('my_sessions');
    if (data !== null) {
      setSessions(JSON.parse(data));
      console.log(sessions);
    }
  }, []);


  // save 
  useEffect(() => {
    localStorage.setItem("my_sessions", JSON.stringify(sessions));
  }, [sessions]);




  function resetDateDay() {
    setDate("");
    setDay("");
  }

  function updateDate(event) {
    setDate(event.target.value);
  }


  function updateDay(day) {

    switch (day) {
      case "Push":
        setDay("Push")
        break;


      case "Pull":
        setDay("Pull")
        break;

      case "Legs":
        setDay("Legs")
        break;

    }
  }


  function updateSessions(exercises) {

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    setSessions(s => [...s, currSession]);
    console.log(sessions);

    resetDateDay()
  }


  function toggleColorScheme() {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
  }



  return (



    <Routes>

      <Route path="/" element={

        <>

          <Navbar toggleTheme={toggleColorScheme}></Navbar>
          <Header date={date} day={day} updateDate={updateDate}
            updateDay={updateDay} toggleTheme={toggleColorScheme}></Header>
          <Exercises
            updateSessions={updateSessions} date={date} day={day}></Exercises>
          <Sessions sessions={sessions}></Sessions>

        </>


      } />

      <Route path="/search" element={<>
        <Navbar ></Navbar>
        <Search></Search>
      </>} />

    </Routes>



  );
}

export default App
