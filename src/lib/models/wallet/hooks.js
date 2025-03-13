import { useMutation, useQuery } from "@tanstack/react-query";
import { backendFetch } from "../../core/clients";


export const useFetchUserBalance = () => {
    const token = localStorage.getItem('token')

    const fetchUserBalance = () =>
        backendFetch({
            endpoint: `/wallet-service/wallet/balance`,
            token: token
        });

    return useQuery({
        queryKey: ["FETCH_USER_BALANCE"],
        queryFn: () => fetchUserBalance(),
        ...{
            staleTime: Infinity,
        }
    });
};

export const useMutateTransferFunds = ({options}) => {
    const token = localStorage.getItem('token')

    const transferFunds = (data) =>
        backendFetch({
            endpoint: "/wallet-service/wallet/transfer/",
            body: data,
            method: "POST",
            token: token
        });
    return useMutation({
        mutationFn: transferFunds,
        ...options,
    });
};

export const useMutateWithdraw = ({options}) => {
    const token = localStorage.getItem('token')

    const withdraw = (data) =>
        backendFetch({
            endpoint: "/wallet-service/wallet/withdraw/",
            body: data,
            method: "POST",
            token: token
        });
    return useMutation({
        mutationFn: withdraw,
        ...options,
    });
};
