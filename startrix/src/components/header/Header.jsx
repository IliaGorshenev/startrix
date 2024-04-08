import React from 'react'
import classes from './header.module.scss'
import { useState } from 'react'
import Hamburger from 'hamburger-react'
import { useMediaPredicate } from "react-media-hook";


function Header({theme}) {
  const links = [{name: 'Рейтинг', href: ''}, 
  {name: 'База кандидатов', href: ''}, 
  {name: 'Тарифы', href: ''}]

  const [isOpen, setOpen] = useState(false)
  const biggerThan767 = useMediaPredicate("(min-width: 768px)");
  const lessThan767 = useMediaPredicate("(max-width: 768px)");

  lessThan767 && links.unshift({name: 'Авторизоваться', href: ''})
  const navClasses = isOpen ? [classes.navContainer, classes.active].join(' ') : classes.navContainer; 

  return (
    <header className={classes.header}>
      <div styles={{overflow: "hidden"}} className={classes.headerContainer}>
        <a href="#" className={classes.logoLink}>
            <svg  className={classes.iconContainer} width="79" height="77">
              <use xlinkHref="/logo.svg#logo-icon"></use>
            </svg>
            <div className={classes.logoTextContainer}>
            <svg className={classes.logoText} width="265" height="40">
              <use xlinkHref="/logo.svg#logo-text"></use>
            </svg>
            <svg  className={classes.logoSubText}width="265" height="13">
              <use xlinkHref="/logo.svg#logo-sub-text"></use>
            </svg>
            </div>
        </a>
        <nav className={navClasses}>
          <ul>
            {links.length > 0 ? links.map(link => 
              <li>
                <a className={classes.navLink} href={link.href}>{link.name}
                </a>
              </li>
            ) : 'Другие страницы недоступны'}
          </ul>
        </nav>
        
        {biggerThan767 && <button data-theme={theme} className={classes.button}>Войти</button>}
        {lessThan767 && <Hamburger  className={classes.burgerButton} duration={0.8} toggled={isOpen} toggle={setOpen}></Hamburger>}
        
      </div>
    </header>
  )
}

export default Header
