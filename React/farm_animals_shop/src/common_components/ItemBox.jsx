import React, { useState } from 'react'
import styles from './ItemBox.module.css'

const ItemBox = ({children}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
    className={`${styles.hoverableDiv} ${hover ? styles.hoverableDivHovered : ''}`}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    {children}
  </div>
  )
}

export default ItemBox