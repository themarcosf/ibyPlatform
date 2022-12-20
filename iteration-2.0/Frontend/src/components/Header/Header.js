import styles from './Header.module.scss'

function Header({children}){
     return (
       <header className={styles.headerContainer}>
           {children}
       </header>
   )
}

export default Header;