import { NextPage } from "next";

import RestaurantInterface from "interfaces/restaurant";
import ReviewInterface from "interfaces/review";

interface Props {
    restaurant: RestaurantInterface;
}

const ReviewSection: NextPage<Props> = ({ restaurant }) => {

    let reviews: ReviewInterface[] = []

    if(restaurant.reviews.length > 0){
        reviews = restaurant.reviews;
    }
 

    return (
        <div>
            {
                reviews.length > 0 ? reviews.map(item => {
                    return (
                        <div key={item._id}>
                            <p>{item.stars}</p>
                            <p>{item.user.username}</p>
                            <p>{item.context}</p>
                            <p>{item.created}</p>
                        </div>
                    )
                }) : <p>No reviews</p>
            }
        </div>
    )

}

export default ReviewSection;