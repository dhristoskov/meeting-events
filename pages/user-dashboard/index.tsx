import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import { useCallback } from 'react';
import axios from 'axios';

import UserInterface from 'interfaces/user';
import UserInfoBar from '@/components/user-dashboard-component/UserDashboardInfo/UserInfoBar';
import UserReservation from '@/components/user-dashboard-component/UserReservations/UserReservation';
import ReservationInterface from 'interfaces/reservation';

import styles from '@/styles/layout.module.scss';

interface Props {
    user: UserInterface;
    reservations: ReservationInterface[]
}

const UserProfilePage: NextPage<Props> = ({ user, reservations }) => {

  const router = useRouter();

  const refreshData = useCallback(() => {
    router.replace(router.asPath)
  }, []);

    return(
        <div className={styles.reservations}>
            <UserInfoBar user={user} refreshData={refreshData}/>
            <UserReservation reservations={reservations} />
        </div>
       
    )
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {

    const { token } = parseCookies(ctx);

    if ( !token ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    const urlProfile = `http://localhost:3000/api/user-profile/profile`;
    const urlReservations = `http://localhost:3000/api/reservations/user`;

    const responseProfile = axios.get(urlProfile, { headers: { Authorization: token } });
    const responseReservations = axios.get(urlReservations, { headers: { Authorization: token } });

    let profile: UserInterface = null;
    let reservations: ReservationInterface[] = [];

    await axios.all([
        responseProfile,
        responseReservations
      ])
      .then(axios.spread((...responses) => {
        profile = responses[0].data.user;
        reservations = responses[1].data.reservations;
      }));

    return {
       props: { user: profile, reservations }
    };
}
