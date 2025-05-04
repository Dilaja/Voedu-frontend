import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const { token } = useParams();

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/activate/${token}`);
        alert(res.data.message || "Account activated successfully!");
        window.location.href = "/";
      } catch (err) {
        alert("Activation failed");
      }
    };

    activate();
  }, [token]);

  return <div className="text-center mt-5">Activating your account...</div>;
};

export default ActivateAccount;
