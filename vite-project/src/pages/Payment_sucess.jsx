import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const searchQuery=useSearchParams()[0];
  const referenceNum=searchQuery.get("reference");
  return (
    
    <div className="paymentcss">
      <div>Order Successful</div>
      Reference No: {referenceNum}
    </div>
  );
};

export default PaymentSuccess;
