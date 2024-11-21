import {FC} from "react";
import BannerImage from '../../assets/banner.jpg'
import styles from './styles.module.scss'

const FirstSection: FC = () => {
    return (
      <div className={styles.firstsection}>
        <img src={BannerImage} alt="Banner" />
      </div>
    )
}

export default FirstSection;