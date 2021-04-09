import { NextPage } from 'next';

import UserSettings from '@/components/user-dashboard-component/UserDashboardInfo/UserSettings';
import UserInfo from './UserInfo';
import UserInterface from 'interfaces/user';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    user: UserInterface;
    refreshData: () => void;
}

const UserInfoBar: NextPage<Props> = ({ user, refreshData }) => {

    return (
        <div className={styles.submenu}>
            <UserInfo user={user} refreshData={refreshData}/>
            <UserSettings refreshData={refreshData}/>
        </div>
    )

}

export default UserInfoBar