
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserActions from "../../actions/user-actions";
import loader from '../../assets/loader.gif';
import './user-profile.css';

export const UserProfileComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersInfo = useSelector((state) => state.usersData);

    // useEffect(() => {
    //     if (usersInfo.user?.id != null && usersInfo.user?.first_name === undefined) {
    //         // UserActions.loadUserProfile(dispatch, usersInfo.user.id);
    //     }
    //     else {
    //         // redirect to login
    //         console.log("Redirect To login");
    //         navigate('/');
    //     }
    // }, [usersInfo.user])

    useEffect(() => {
        console.log("UserProfileUseeffect::", usersInfo.user);
        // UserActions.loadUserProfile(dispatch, usersInfo.user?.id);
        UserActions.loadUserProfile(dispatch, 4);
    }, [dispatch]);


    const logout = () => {
        UserActions.resetUser(dispatch);
        navigate('/');
    }

    const errorContainer = () => { return <div>ERROR IN API</div>; }
    const showLoader = () => { return <div className='loading-container'><img src={loader} alt="loading ..." title="loading ..." /></div>; }
    const renderData = (usersInfo) => {
        console.log("InUserProfile::", usersInfo);
        return usersInfo.error ? errorContainer() :
            <div className="profile-container">
                <div className='item-list'>
                    {usersInfo.user?.id ?
                        <div className="item">
                            <div> <h4>{usersInfo.user.first_name} {usersInfo.user.last_name}</h4></div>
                            <div><p>{usersInfo.user.email}</p></div>
                            <div><img src={usersInfo.user.avatar} alt="loading ..." title="loading ..." /></div>
                            <div>
                                <Button variant="contained" size="small" color="secondary" className="loginBtn" onClick={logout}>Logout</Button>

                                <Button variant="contained" size="small" color="secondary" className="loginBtn" onClick={() => navigate('/user-list')}>User List</Button>
                            </div>
                        </div>
                        : "No data available"}
                </div>

            </div>
    }
    return (
        usersInfo.loading ? showLoader() : renderData(usersInfo)
    )
}