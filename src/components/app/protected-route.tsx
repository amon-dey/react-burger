import React from 'react';
import { useSelector } from "../../services/store.ts";
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/user/user.ts";

type ProtectedRouteProps<T extends object = object> = {
    onlyUnAuth?: boolean;
    component: React.ComponentType<T>;
};

const ProtectedRouteElement = <T extends object>({ onlyUnAuth = false, component: Component }: ProtectedRouteProps<T>): React.JSX.Element => {
    const isAuthChecked = useSelector(getIsAuthChecked);
    const user = useSelector(getUser);
    const location = useLocation();

    if (!isAuthChecked) {
        return <p>Загрузка...</p>;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state ?? { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} replace={true}/>;
    }

    return <Component {...({} as T)} />;
};

export const OnlyAuth = <T extends object>(props: ProtectedRouteProps<T>) => (
    <ProtectedRouteElement<T> onlyUnAuth={false} {...props} />
);

export const OnlyUnAuth = <T extends object>(props: ProtectedRouteProps<T>) => (
    <ProtectedRouteElement<T> onlyUnAuth={true} {...props} />
);