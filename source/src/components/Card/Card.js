import styles from './Card.module.scss'

function Card({children}) {
     return (
       <div className={styles.cardContainer}>
           {children}
       </div>
   )
}

export default Card;