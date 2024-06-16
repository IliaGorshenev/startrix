import { useState, useEffect } from "react";
import classes from './App.module.scss'
import Header from "../components/header/Header.jsx";
import candidateservice from "../api/api";
import Select from "../components/select/index.jsx";
import Checkbox from "../components/checkbox/index.jsx";
import axios from "axios";
import { cities, directions, englishCities, skills } from "../mocks/data.js";

function App() {
  const [candidates, setCandidates] = useState([])
  const [cityApi, setCity] = useState([])
  const [jobApi, setJobApi] = useState([])
  const [skillApi, setSkillApi] = useState([])
  const [fetching, setFetching] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [openId, setId] = useState(null)

  const checkCityApi = cityApi && cityApi.map((item) => `&city=${englishCities[item]}`).join('').slice(1);
  const checkJobApi = jobApi && jobApi.map((item) => `&job=${item}`).join('')
  const checkSkillApi = skillApi && skillApi.map((item) => `&language=${item}`).join('')

  const filterVoid = cityApi.length === 0 && jobApi.length === 0 && checkSkillApi.length === 0;

  const scrollHandler = (e) => {
    if(e.target.scrollHeight - (window.innerHeight + e.target.scrollTop) < 200) {
      setFetching(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler, true)
    return function () {
      document.removeEventListener('scroll', scrollHandler, true)
    }
  }, [])

  const fetch = async function() {
    try {
      const result = await axios.get(`https://startrixapi.ru/api/v1/userdata/?${checkCityApi}${checkJobApi}${checkSkillApi}&page=${pageCount > 1 ? pageCount : 1}`)
      const data = result.data
      const count = data.count 
      setTotalCount(count)
      if(!fetching && !filterVoid) {
        setCandidates([...data.results])
      } else if (fetching && !filterVoid) {
          setCandidates([...candidates, ...data.results])
          setFetching(false)
      } else if(!fetching && !filterVoid) {
        setCandidates([...candidates])
      } else {
        setCandidates([])
      }
    } catch {
      return alert('Some mistake')
    }
  }
  const [access, setAccess] = useState(true)
  const [pressed, setPressed] = useState(false)

  useEffect(()=>{
    if(fetching && access) {
      setPageCount(pageCount + 1)
    }
  },[fetching])

  useEffect(() => {
    setAccess(totalCount > candidates.length)
  }, [candidates])

  useEffect(() => {
    fetch()
  }, [pageCount])

 
  useEffect(()=>{
    setCandidates([])
    if(pageCount > 1) {
      setPageCount(1)
    } else {fetch()}
  },[cityApi, jobApi, skillApi])

  const pressedMaker = () => {
    if (pressed) {
      setPressed(false)
    } else {setPressed(true)}
  }
  return (
  <div className={classes.root}>
    <div className={classes.adaptive}>
      <Header />
      <main className={classes.main}>
        {openId !== null && <div className={classes.propagation} onClick={() => setId(null)}></div>}
        <div className={classes.wrapper}>
          <div className={classes.first}>
            <Select 
              mainTitle={"Города"} 
              fieldTitle={"Выбрать город"} 
              items={cities}
              isOpen={openId === 1}
              opener={()=>(1 === openId ? setId(null) : setId(1))}
              citiesList={cityApi}
              setCity={(e) => setCity([...e])}
            />
            <Select 
              mainTitle={"Сфера"} 
              fieldTitle={"Выбрать направление"} 
              items={directions}
              isOpen={openId === 2}
              opener={()=>(2 === openId ? setId(null) : setId(2))}
              setCity={(e) => setJobApi([...e])}
            />
            <Checkbox/>
            <Select 
              mainTitle={"Навыки"} 
              fieldTitle={"Выбрать навыки"} 
              items={skills}
              isOpen={openId === 3}
              opener={()=>(3 === openId ? setId(null) : setId(3))}
              setCity={(e) => setSkillApi([...e])}
            />
            {/* <Button onClick={() => pressedMaker()} variant={buttonVariants.PRIMARY} text={"Подобрать кандидатов"}/> */}
          </div>
          <div className={classes.second}>
            {candidates.length > 0 && candidates.map((post) => {
              return (<div className={classes.secondPost}>
                <img className={classes.secondPhoto} width="68" height="68" src={post.image_url}></img>
                <div className={classes.secondList}>
                <p className={classes.secondTitle}>
                {post.first_name} {post.last_name}
                </p>
                <div className={classes.secondPlace}>
                {post.country} {post.city}
                </div>
                <div>
                {post.jobtitle}
                </div>
                <div className={classes.secondSkills}>
                {post.programming_languages.map((item) => {
                  return <span className={classes.secondSkill}>{item}</span>
                })}
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                From: {post.source} <br></br> 
                Contacts: 
                {post.contacts.length > 0 && 
                post.contacts.map((item, index) => {
                  return (<a href={item} key={index} style={{wordWrap: "break-word"}} target="_blank">{item.split(',').join(' ')}</a>)
                })}
                </div>
                <div>
                {post.experience_month}
                </div>
                </div>
              </div>)
            }) || filterVoid && <p style={{textAlign: "center", padding: "20px"}} className={classes.secondTitle}>Выберите фильтры, чтобы подобрать нужных кандидатов</p>}
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}

export default App;
