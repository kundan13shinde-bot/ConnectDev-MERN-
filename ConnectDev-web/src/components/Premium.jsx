import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "ConnectDev",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div className="text-center text-3xl font-bold mt-20">
      🎉 You're already a Premium User!
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">

        {/* Silver Card */}
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">

          <div className="flex items-center gap-3">
            <FaCrown className="text-3xl text-gray-300" />
            <h1 className="font-bold text-3xl">Silver Membership</h1>
          </div>

          <ul>
            <li>- Chat with other people</li>
            <li>- 100 Connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 Months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>

        <div className="divider divider-horizontal text-lg font-bold">
          OR
        </div>

        {/* Gold Card */}
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">

          <div className="flex items-center gap-3">
            <FaCrown className="text-3xl text-yellow-400" />
            <h1 className="font-bold text-3xl">Gold Membership</h1>
          </div>

          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite Connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 Months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>

      </div>
    </div>
  );
};

export default Premium;