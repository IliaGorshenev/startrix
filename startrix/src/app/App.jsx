import { useState, useEffect } from "react";
import classes from './App.module.scss'
import { HelmetProvider, Helmet } from "react-helmet-async"
import Header from "../components/header/Header.jsx";
import PostService from "../api/api";
import Select from "../components/select/index.jsx";
import { useWindowWidth } from "../hooks/useWindowWidth.js";

const cities = [
  "Москва", 
  "Санкт-Петербург",
  "Владивосток",
  "Шатура",
  "Пятигорск",
]

const directions = [
  "backend", 
  "frontend",
  "design",
  "analitics",
  "data-science",
]

const skills = [
  "Python", 
  "Java",
  "Figma",
  "JavaScript",
  "React",
]

function App() {


  const [posts, setPosts] = useState([])
  const [buttonLoader, setLoader] = useState("false")
  const [theme, setTheme] = useState('light')

  // const fetch = async function() {
  //   try {
  //     setLoader("true")
  //     setTimeout(async () => {
  //       const result = await PostService.getAllCandidates()
  //       setPosts(result.data)
  //       setLoader("false")
  //     }, 800)
  //   } catch {
  //     return alert('Some mistake')
  //   }
  // }
  const [openId, setId] = useState(null)
  return (
  <div className={classes.root}>
    <div className={classes.adaptive}>
      <Header />
      <main className={classes.main}>
        <div className={classes.wrapper}>
          <div className={classes.first}>
            <Select 
              mainTitle={"Города"} 
              fieldTitle={"Выбрать город"} 
              items={cities}
              isOpen={openId === 1}
              opener={()=>(1 === openId ? setId(null) : setId(1))}
            />
            <Select 
              mainTitle={"Сфера"} 
              fieldTitle={"Выбрать направление"} 
              items={directions}
              isOpen={openId === 2}
              opener={()=>(2 === openId ? setId(null) : setId(2))}
            />
            <Select 
              mainTitle={"Навыки"} 
              fieldTitle={"Выбрать навыки"} 
              items={skills}
              isOpen={openId === 3}
              opener={()=>(3 === openId ? setId(null) : setId(3))}
            />
          </div>
          <div className={classes.second}>

          </div>
        </div>
      </main>
    </div>
  </div>
  );
}

export default App;
