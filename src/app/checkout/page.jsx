// app/checkout/page.jsx
import CheckoutLayout from "@/components/layout/checkout";
import CheckoutView from "@/components/view/checkout";

const CheckoutPage = () => {
  return (
    <CheckoutLayout>
      <CheckoutView />
    </CheckoutLayout>
  );
};

export default CheckoutPage;
