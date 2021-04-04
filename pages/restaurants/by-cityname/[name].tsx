import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from 'axios';

import RestaurantCard from "@/components/restaurant-component/RestaurantCard";
import RestaurantInterface from "interfaces/restaurant";

import styles from '@/styles/restaurant.module.scss';

interface Props {
  restaurants: RestaurantInterface[];
}

const RestaurantsByCity: NextPage<Props> = ({ restaurants }) =>  {

  const router = useRouter();

  const onCardOpen = (id: string): void => {
    router.push(`/restaurants/${id}`)
  }

  return (
    <div className={styles.wrapper}>
      {
        restaurants.map( item => {
          return (
            <RestaurantCard restaurant={item} onCardOpen={onCardOpen} key={item._id}/>
          )
        })
      }
    </div>
  )
}

export default RestaurantsByCity;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { name } }) => {

  const url = `http://localhost:3000/api/restaurant/get-by-city`;
  const payload = { params: { name } };

  const response = await axios.get(url, payload);

  if ( !response  ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  }

  return {
     props: { restaurants: response.data.restaurants  }
  };
}
