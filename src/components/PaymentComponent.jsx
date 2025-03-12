'use client';
import React, { useEffect, useState } from 'react';
import { useMutateInitiatePayment, useMutateVerifyPayment } from '../lib/models/payment/hooks';
import { env } from '../lib/core/clients';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PaymentComponent = ({ amount }) => {
    const navigate = useNavigate();

  const publicKey = env.VITE_APP_PAYSTACK_PUBLIC_KEY;

  // Initialize the mutation hook
  const {isLoading: isInitializeLoading, mutate: mutateInitiatePayment } = useMutateInitiatePayment({
    onSuccess: (resp) => {
      console.log('Payment Initialization Successful:', resp);
      const old_transaction_id = resp?.result?.transaction_id;


      if (old_transaction_id) {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: 'famaths011@gmail.com',
          amount: amount * 100, // Amount in kobo , to be changed to original amount
          currency: 'NGN',
          reference: old_transaction_id, // Use the backend-generated reference
          onClose: () => {
            toast.error("Payment was canceled");
            navigate('/dashboard');
          },
          callback: (response) => {

              mutateVerifyPayment({old_transaction_id: old_transaction_id , transactionRef: response.reference });
            //   alert(`Payment complete! Reference: ${response.reference}`);

          },
        });

        handler.openIframe(); // Open the Paystack modal
      } else {
        // alert('Invalid transaction reference.');
      }
    },
    onError: (error) => {
      console.log('Error Initializing Payment:', error);
        toast.error("Payment initialization failed.");
        navigate('/dashboard');
    },
  });

  const { mutate: mutateVerifyPayment } = useMutateVerifyPayment({
    onSuccess: (verificationResp) => {
      console.log('Payment Verification Successful:', verificationResp);
      if (verificationResp.result.payment_status == 'Success') {

        toast.success("Payment verified successfully");
        window.location.reload()
        // navigate('0');
      } else {

        toast.error("Technical issues!");
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      console.error('Error Verifying Payment:', error);
    //   alert('An error occurred during payment verification.');
        toast.error("An error occurred during payment verification.");
        navigate('/dashboard');
    },
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.nonce = '2343iooijk';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {

    if (!amount || amount === 0) {
        toast.error('Amount cannot be empty'); // Display toast error message
        return;
      }

    const payload = {
                    "user_id": "67cfcb622ff9294453564a7f",
                    "amount" : amount

                }
    mutateInitiatePayment(payload);
  };

  return (

    <>
        <button
                  onClick={handlePayment}
                  disabled={isInitializeLoading}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 sm:w-auto"
                >
                  {isInitializeLoading ? "Processing..." : "Fund Wallet"}
                </button>
    </>
  );
};

export default PaymentComponent;