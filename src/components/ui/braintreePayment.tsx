import { useEffect, useState, useRef } from "react";
import dropin from "braintree-web-drop-in";
import { getBraintreeToken } from "../../api/baseapi";

function BraintreePayment({ setInstance }:any) {
  const [clientToken, setClientToken] = useState("");
  const dropinRef = useRef(null);

  // 🔹 Load token
  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const res = await getBraintreeToken();
      setClientToken(res.clientToken);
    } catch (err) {
      console.error("Token error:", err);
      setClientToken("");
    }
  };

  // 🔹 Initialize Drop-in UI
  useEffect(() => {
    if (!clientToken || !dropinRef.current) return;

    let dropinInstance:any = null;

    dropin.create(
      {
        authorization: clientToken,
        container: dropinRef.current, // ✅ FIXED
      },
      (err, instance) => {
        if (err) {
          console.error("Drop-in error:", err);
          return;
        }

        dropinInstance = instance;
        setInstance(instance); // ✅ parent को भेज रहे हो
      }
    );

    // 🔥 VERY IMPORTANT CLEANUP
    return () => {
      if (dropinInstance) {
        dropinInstance.teardown();
      }
    };
  }, [clientToken]);

  return (
    <div>
      <div ref={dropinRef}></div>
    </div>
  );
}

export default BraintreePayment;