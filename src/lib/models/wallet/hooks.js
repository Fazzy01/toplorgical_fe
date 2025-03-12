import { useQuery } from "@tanstack/react-query";
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
