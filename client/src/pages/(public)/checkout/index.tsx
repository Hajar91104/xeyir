import CheckoutCard from "./components/CheckoutCard";
import DetailImage from "@/assets/images/andrew_detail.png";

const CheckoutPage = () => {
  const Andre = {
    image: DetailImage,
    title: "Help 10 year old Andre Howard Recover After Plane Crash",
    author: "LaShawn Hamiel",
  };
  return (
    <div className="bg-[#f4f2ec]">
      <div className="lg:container mt-[64px] py-5">
        <CheckoutCard fundraiser={Andre} />
      </div>
    </div>
  );
};

export default CheckoutPage;
