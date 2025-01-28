import React from 'react';
import { useSelector } from "../../services/store.ts";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/user/slice.ts";

type TProtectedProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps): React.JSX.Element => {
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

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }): React.JSX.Element => (
    <Protected onlyUnAuth={true} component={component} />
);