import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../features/users/auth-slice'

function TokenRefreshTimer() {
    let [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const userLogin = useSelector((store) => store.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if(loading) {
            dispatch(refreshToken());
            setLoading(false);
        }

        const refreshInterval = setInterval(() => {
            if(userInfo){
                dispatch(refreshToken());
            }     
        }, 240000);

        return () => clearInterval(refreshInterval);
    }, [dispatch, loading, userInfo])
  return (
    <>
    </>
  )
}

export default TokenRefreshTimer
