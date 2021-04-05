import { NextPage } from "next";
import { IoCashOutline, IoSunnyOutline } from 'react-icons/io5';

import CostumerStats from "./CostumerStats"

import styles from '@/styles/restaurant.module.scss';

interface Props {
    priceLevel: string;
    hasGarten: boolean;
}

const InfoBar: NextPage<Props> = ({ priceLevel, hasGarten }) => {

    const priceLevelSwitcher = ( priceLevel: string ): string => {
        switch(priceLevel){
            case 'low': return ' €';
            case 'medium' : return ' € €';
            case 'high' : return ' € € €';
            case 'very high' : return ' € € € €';
        }
    }

    return (
        <div className={styles.addinfo}>
            <CostumerStats />
            <div className={styles.states}><IoCashOutline className={styles.stars} /> 
            { priceLevelSwitcher(priceLevel) }</div>
            {
                hasGarten && 
                <div className={styles.states}><IoSunnyOutline className={styles.stars} />
                <span>Garden</span></div>
            }
        </div>
    )
}

export default InfoBar;