import api from "../../utils/api";
import "./style.css";

type Props = {};

const StripeConnect = (props: Props) => {
  const handleStripeAdd = async () => {
    try {
      const data = await api.post("/billing/connect-stripe");
      console.log(data);
      window.open(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="main-stripe">
      <div className="text-center">
        <h2>Stripe</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <button onClick={handleStripeAdd}>Connect Stripe</button>
      </div>
    </section>
  );
};

export default StripeConnect;
