import {FC, useEffect, useState, useRef} from "react";
import CartoonImage from '../../assets/cartoon.jpg'
import MovieImage from '../../assets/movie.jpg'
import LifeImage from '../../assets/life.jpg'
import FoodImage from '../../assets/food.jpg'
import LogoImage from '../../assets/logo.png'
import styles from './styles.module.scss'
import { queryByDisplayValue } from "@testing-library/react";
import classNames from "classnames";

const tabs = [
  {
    key: 'cartoon',
    title: '动画',
    image:CartoonImage,
  },
  {
    key: 'food',
    title: '美食',
    image: FoodImage,
  },
  {
    key: 'movie',
    title: '电影',
    image: MovieImage,
  },
  {
    key: 'life',
    title: '生活',
    image: LifeImage,
  }
]

const TAB_HEIGHT = 56;

const SecondSection: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cartoon');
  const [isFixed, setIsFixed] = useState<boolean>(false)

  const secondSectionRef = useRef<HTMLDivElement>(null);

  const activate = (key: string) => {
    setActiveTab(key);
    const tabContentEl = document.querySelector(`[data-id="${key}"]`)

    if(tabContentEl){
      tabContentEl.scrollIntoView({behavior: 'smooth'});
    }
  }

  const onScroll = () => {
      if(secondSectionRef.current){
        const { top } = secondSectionRef.current.getBoundingClientRect();
        setIsFixed( top <= 0);

        const sectionNodes = secondSectionRef.current.querySelectorAll('section');
      
      
      
      Array.from(sectionNodes).forEach(sectionEl => {
        const {top} = sectionEl.getBoundingClientRect();
        const key = sectionEl.getAttribute('data-id')|| '';
        if(top <= TAB_HEIGHT){
          setActiveTab(key);
        }
      })
    }  
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
   },[]);
     
  
    return (
      <div className={styles.secondSection} ref={secondSectionRef}>
        {/*tabs*/} 
        <ul className={classNames({[styles.isFixed]: isFixed})}>
          {tabs.map(tab => (
            <li key={tab.key} onClick={() => activate(tab.key)}>
            <span>{tab.title}</span>
            <span className={classNames(styles.line, {[styles.visible]:activeTab===tab.key})}></span>
          </li>
          ))}
        </ul>
        {/*Tab Content*/}
        <div>
          {tabs.map(tab => (
            <section data-id={tab.key} key={tab.key}>
                <h2>{tab.title}</h2>
                <img src={tab.image} alt={tab.key} />
             </section>
          ))}
        </div>
        <div className={classNames(styles.btnWrapper, {[styles.visible]: isFixed})}>
          <img src={LogoImage} alt="logo"/>

          <a href="https://www.bilibili.com" target="_blank">
          <button>App 内打开</button>
          </a>
        </div>

      </div>
    )
}

export default SecondSection;