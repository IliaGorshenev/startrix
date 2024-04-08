import { useState, useEffect } from "react";
import PostService from "../api/api";
import classes from './app.module.scss'
import { HelmetProvider, Helmet } from "react-helmet-async"
import Header from "../components/header/Header.jsx";
function App() {

  const [posts, setPosts] = useState([])
  const [buttonLoader, setLoader] = useState("false")
  const [theme, setTheme] = useState('light')

  const fetch = async function() {
    try {
      setLoader("true")
      setTimeout(async () => {
        const result = await PostService.getAllCandidates()
        setPosts(result.data)
        setLoader("false")
      }, 800)
    } catch {
      return alert('Some mistake')
    }
  }

  const themeChanger = function(theme) {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  console.log(posts)

  return (
  <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
    <Header  data-theme={theme} />
    <main data-theme={theme} className="container">
      <div className={classes.main_container}>
      <div styles={{marginTop: "40px"}}>
        <h1 styles={{display: 'block', textAlign: "center"}}>AI-Recruter</h1>
        <form> 
          <label for="city">Локация</label>
            <select id="city" required>
              <option value="noCity" selected>Выберите город</option>
              <option value="Moscow">Москва</option>
              <option value="SPB">Питер</option>
              <option value="SPB">Самара</option>
            </select>
            <label for="work">Направление</label>
          <select id="work" required>
            <option value="noLevel" selected>Выберите направление</option>
            <option value="senior">Фронтенд</option>
            <option value="middle">Бэкенд</option>
            <option value="junior">Проджект-менеджмент</option>
            <option value="junior">Аналитика</option>
          </select>
          <label for="level">Уровень</label>
          <select id="level" required>
            <option value="noLevel" selected>Выберите уровень</option>
            <option value="senior">Сеньер</option>
            <option value="middle">Мидл</option>
            <option value="junior">Джун</option>
          </select>
          <label for="skills">Навыки</label>
          <select id="skills" required>
            <option value="noLevel" selected>Навыки</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Pandas">Pandas</option>
            <option value="Figma">Figma</option>
          </select>
          <button styles={{marginBottom: "30px"}} data-theme={theme} aria-busy={buttonLoader} onClick={(e) => {e.preventDefault(); fetch()}}>Показать кандидатов</button>
        </form >
        <button data-theme={theme} className={'secondary'} onClick={() => themeChanger(theme)}>Поменять тему</button>
        <HelmetProvider>
          <Helmet> 
            <html data-theme={theme} />
          </Helmet>
        </HelmetProvider>
      </div>
      <div>
        {
          posts.length > 0 
          ? posts.map((post,index) => {
            return <article>
              <header>
                <h3>{post.name}</h3>
              </header>
              Работает в <strong>Нигде</strong>
              <span><br></br>
                Живет в <strong>{post.location}</strong>
                </span>
              <footer>
                <br></br>
              <span>
                Почта: <strong>{post.email}</strong>
                </span><br></br>
                <span>
                Телефон: <strong>{post.socials}</strong>
                </span>
                </footer>
              </article>
          })
          : <h3>Пользователи не найдены</h3>
        }
      </div>
      </div>
    </main>

  </div>
  );
}

export default App;
