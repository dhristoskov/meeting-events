import { NextPage } from 'next';

import UserSettings from '@/components/user-dashboard-component/UserDashboardInfo/UserSettings';
import UserInfo from './UserInfo';
import UserInterface from 'interfaces/user';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    user: UserInterface
}

const UserInfoBar: NextPage<Props> = ({ user }) => {

    return (
        <div className={styles.submenu}>
            <UserInfo user={user}/>
            <UserSettings />
        </div>
    )

}

export default UserInfoBar