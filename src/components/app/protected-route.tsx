import React from 'react';
import { useSelector } from "../../services/store.ts";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/user/slice.ts";

type Props = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const ProtectedRouteElement = ({ onlyUnAuth = false, component }: Props): React.JSX.Element => {
    const isAuthChecked = useSelector(getIsAuthChecked);
    const user = useSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p>Загрузка...</p>;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state ?? { from: { pathname: "/ " } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }): React.JSX.Element => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
);