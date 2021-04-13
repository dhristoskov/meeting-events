import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NextPage } from 'next';

import styles from '@/styles/review.module.scss';

interface Props {
    setIsOpen: (item: boolean) => void;
    onAddReviewHandler: (review: { stars: number, context: string}) => void;
}

const ReviewForm: NextPage<Props> = ({ setIsOpen, onAddReviewHandler }) => {

    const [ review, setReview ] = useState<{stars: number, context: string}>({
        stars: 1,
        context: '',
     });

    const { stars, context } = review;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setReview({...review, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        setIsOpen(false);
        onAddReviewHandler(review);
        setReview({
            stars: 1,
            context: ''
        });
    };

    return (
        <div className={styles.contentform}>
            <p className={styles.close} onClick={() => setIsOpen(false)}>close</p>
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <div className={styles.numbers}>
                    <p>How many stars will you give</p>
                    <input type="number" min='1' max='10' name='stars' value={stars} onChange={onHandleChange}/>
                </div>
               
                <textarea name="context" rows={10} value={context} onChange={onHandleChange}/>
                <input type="submit" value='Submit'/>
            </form>
        </div>
    )
}

export default ReviewForm