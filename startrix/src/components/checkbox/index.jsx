import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './Checkbox.module.scss'


const Checkbox = (
  {
    mainTitle,
    items
  }
) => {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{mainTitle}</h4>
      <div className={styles.field}>
        <div className={styleList}>
        {items && items.map((item) => (
            <div onClick={(e) => {itemHandler(e.target.innerText)}} className={styles.listItem}>
              {item}
            </div>
          ))
        }
      </div>
      </div>
      {used.length > 0 && 
        <div className={styles.chosenList}>
          {used.map((item) => (
            <div onClick={(e) => {itemHandler(e.target.innerText)}} className={styles.chosenItem}>
              <span className={styles.chosenItemText}>{item}</span>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Checkbox
