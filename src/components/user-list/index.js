
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserActions from "../../actions/user-actions";
import loader from '../../assets/loader.gif';
import './user-list.css';

export const UserListComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersInfo = useSelector((state) => state.usersData);

   

    useEffect(() => {
        UserActions.loadUsers(dispatch);
    }, [dispatch])

    const logout = () => {
        UserActions.resetUser(dispatch);
        navigate('/');
    }

    const errorContainer = () => { return <div>ERROR IN API</div>; }
    const showLoader = () => { return <div className='loading-container'><img src={loader} alt="loading ..." title="loading ..." /></div>; }
    const renderData = (usersInfo) => {
        return usersInfo.error ? errorContainer() :
            <div className="list-container">
                <div>
                    <Button variant="contained" size="small" color="secondary" className="loginBtn" onClick={logout}>Logout</Button>

                    <Button variant="contained" size="small" color="secondary" className="loginBtn" onClick={() => navigate('/profile')}>User Profile</Button>
                </div>

                <div className='item-list'>
                    {usersInfo.usersList?.data?.length > 0 ? usersInfo.usersList.data.map((user, index) =>
                        <div className="item" key={index}>
                            <div> <h4>{user.first_name} {user.last_name}</h4></div>
                            <div><p>{user.email}</p></div>
                            <div><img src={user.avatar} alt="loading ..." title="loading ..." /></div>
                        </div>) : "No data available"}
                </div>

            </div>
    }
    return (
        usersInfo.loading ? showLoader() : renderData(usersInfo)
    )
}