import Image from 'next/image';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import styles from './home.module.scss'

function index(){
     return (
       <Header>
        <Image src='/iby_logo.png' width={100} height={41} alt="iby_logo"/>
        <NavBar />
       </Header>
   )
}

export default index;