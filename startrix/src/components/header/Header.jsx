import React from 'react'
import classes from './header.module.scss'
import { useState } from 'react'
import Hamburger from 'hamburger-react'
import { useMediaPredicate } from "react-media-hook";
import Logo from '../logo';
import Button, { buttonVariants } from '../button/Button';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const links = [
  {name: 'О нас', href: ''}, 
  {name: 'База кандидатов', href: ''}, 
  {name: 'Тарифы', href: ''}
]

function Header() {

  const [isOpen, setOpen] = useState(false)
  const width = useWindowWidth()
  const MOBILE = width < 767;

  return (
    <header className={classes.header}>
      <div styles={{overflow: "hidden"}} className={classes.headerContainer}>
        <Logo/>
        <nav className={classes.nav}>
          <ul>
            {links.length > 0 ? links.map(link => 
              <li>
                <a className={classes.navLink} href={link.href}>{link.name}
                </a>
              </li>
            ) : 'Другие страницы недоступны'}
          </ul>
        </nav>
        <div className={classes.authorisation}>
          <Button variant={buttonVariants.SECONDARY} text={"Войти"}/>
          <Button variant={buttonVariants.PRIMARY} text={"Регистрация"}/>
          {MOBILE && <Hamburger  className={classes.burgerButton} duration={0.8} toggled={isOpen} toggle={setOpen}></Hamburger>}
        </div>
      </div>
    </header>
  )
}

export default Header
