import { NextPage } from "next";
import { IoRibbonOutline } from 'react-icons/io5'; 

import RestaurantInterface from "interfaces/restaurant";
import ReviewInterface from "interfaces/review";

import styles from '@/styles/review.module.scss';

interface Props {
    restaurant: RestaurantInterface;
}

const ReviewSection: NextPage<Props> = ({ restaurant }) => {

    let reviews: ReviewInterface[] = []

    if(restaurant.reviews.length > 0){
        reviews = restaurant.reviews;
    }
 

    return (
        <div className={styles.wrapper}>
            {
                reviews.length > 0 ? reviews.map(item => {
                    return (
                        <div className={styles.review} key={item._id}>
                            <div className={styles.info}>
                                <p className={styles.states}>
                                    <IoRibbonOutline className={styles.stars}/><span>{ item.stars }/ 10</span>
                                </p>
                                <p>{item.username}</p>
                            </div>    
                            <div className={styles.context}>
                                <p>{item.context}</p>
                            </div>                        
                            <p className={styles.date}>{ new Date(item.created).toLocaleDateString('de-DE',  { day:'numeric', month: 'long', year: 'numeric' }) }</p>
                        </div>
                    )
                }) : <p>No reviews</p>
            }
        </div>
    )

}

export default ReviewSection;