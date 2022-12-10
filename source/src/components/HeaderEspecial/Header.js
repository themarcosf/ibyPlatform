import styles from './Header.module.scss'

function HeaderEspecial({children}){
     return (
       <header className={styles.headerContainer}>
           {children}
       </header>
   )
}

export default HeaderEspecial;