
import { useMutation, useQuery } from "@tanstack/react-query";
import { backendFetch } from "../../core/clients";

export const useMutateInitiatePayment = (options) => {
    const token = localStorage.getItem('token')
    const initiatePayment = (data) =>
      backendFetch({
        endpoint: '/payment-service/payment/create',
        method: 'POST',
        body: data,
        token: token
    });

    return useMutation({
      mutationFn: initiatePayment,
      ...options,
    });
};

export const useMutateVerifyPayment = (options) => {
    const token = localStorage.getItem('token')
    const verifyPayment = (data) =>
        // /auth-service/auth/verify-token
      backendFetch({
        endpoint: '/payment-service/payment/verify',
        method: 'POST',
        body: data,
        token: token
    });

    return useMutation({
      mutationFn: verifyPayment,
      ...options,
    });
};
