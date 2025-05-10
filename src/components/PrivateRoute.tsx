import React from "react";
import { Navigate } from 'react-router-dom';

interface Props {
    allowedRoles ?: string[];
    children: React.ReactNode;
}

const PrivateRoute : React.FC<Props> = ({allowedRoles, children }) =>{
    const token = localStorage.getItem('authToken')
    const roleId = localStorage.getItem('roleId')

    if(!token) {
        return<Navigate to={"/login"} />
    }

    if(allowedRoles && !allowedRoles.includes(roleId || '')){
        return<Navigate to={"/unauthorized"}/>
    }
    return(
        <>
        {children}
        </>
    )
}

export default PrivateRoute;