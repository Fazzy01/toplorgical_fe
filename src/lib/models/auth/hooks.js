import { useMutation, useQuery } from "@tanstack/react-query";
import { backendFetch } from "../../core/clients";

export const useMutateRegister = ({options}) => {
    const register = (data) =>
        backendFetch({
            endpoint: "/auth-service/auth/signup",
            body: data,
            method: "POST",
        });
    return useMutation({
        mutationFn: register,
        ...options,
    });

};

export const useMutateLogin = ({options}) => {
    const login = (data) =>
        backendFetch({
            endpoint: "/auth-service/auth/login/",
            body: data,
            method: "POST",
        });
    return useMutation({
        mutationFn: login,
        ...options,
    });
};

export const useFetchUserDetails = () => {
    const token = localStorage.getItem('token')

    const fetchUserDetails = () =>
        backendFetch({
            method: "POST",
            endpoint: `/auth-service/auth/verify`,
            body: {split: "_id"},
            token: token
        });

    return useQuery({
        queryKey: ["FETCH_USER_DETAILS"],
        queryFn: () => fetchUserDetails(),
        ...{
            staleTime: Infinity,
        }
    });
};
