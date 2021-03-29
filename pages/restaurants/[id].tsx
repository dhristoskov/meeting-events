import { GetServerSideProps, NextPage } from "next";
import axios from 'axios';

import RestaurantInterface from "interfaces/restaurant";
import RestaurantItem from "@/components/restaurant-component/RestaurantItem/RestaurantItem";

interface Props {
    restaurant: RestaurantInterface;
  }

const RestaurantInfo: NextPage<Props> = ({ restaurant }) => {

    return (
        <RestaurantItem restaurant={restaurant} />
    )

}

export default RestaurantInfo;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { id } }) => {

    const data = { params: { id } };
    const url = `http://localhost:3000/api/restaurant/get-restaurant/`;
  
    const response = await axios.get(url, data);
  
    if ( !response  ) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }
  
    return {
       props: { restaurant: response.data.restaurant }
    };
  }