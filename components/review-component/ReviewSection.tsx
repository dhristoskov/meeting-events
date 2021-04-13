import { NextPage } from "next";
import { IoRibbonOutline } from 'react-icons/io5'; 
import { useContext, useState } from 'react';

import { AuthContext } from 'context/auth-context/AuthContext';
import ReviewInterface from "interfaces/review";

import styles from '@/styles/review.module.scss';
import ReviewForm from "./ReviewForm";

interface Props {
    reviews: ReviewInterface[];
    onAddReviewHandler: (review: { stars: number, context: string}) => void;
}

const ReviewSection: NextPage<Props> = ({ reviews, onAddReviewHandler }) => {

    const { isLoggedIn } = useContext(AuthContext);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return (
        <div className={styles.wrapper}>
            {
                isLoggedIn && <p className={styles.add} onClick={() => setIsOpen(true)}>Add review</p>
            } 
            {
                isOpen  && <ReviewForm setIsOpen={setIsOpen} onAddReviewHandler={onAddReviewHandler}/>
            }
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
                }) : <p>{isLoggedIn ? 'Be the first to add review' : 'No reviews' }</p>
            }
        </div>
    )

}

export default ReviewSection;