import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface Fundraiser {
  image: string;
  title: string;
  author: string;
}

const CheckoutCard = ({ fundraiser }: { fundraiser: Fundraiser }) => {
  const [amount, setAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState(17.5);
  const [paymentMethod, setPaymentMethod] = useState("google-pay");

  const predefinedAmounts = [
    { value: "25", label: "$25" },
    { value: "50", label: "$50" },
    { value: "100", label: "$100", suggested: true },
    { value: "150", label: "$150" },
    { value: "200", label: "$200" },
    { value: "500", label: "$500" },
  ];

  return (
    <div className="w-full lg:max-w-[655px]  mx-auto">
      <Card className="px-4 py-6 xs:py-8 xs:px-12 rounded-[2.5rem]">
        <div className="flex flex-col lg:flex-row  gap-4 mt-6 mb-6">
          <img
            src={fundraiser.image}
            alt="Andre Howard"
            className="lg:w-[104px] lg:h-[78px] rounded-[0.5rem] object-cover"
          />
          <div>
            <h1 className="text-base">
              You're supporting{" "}
              <span className="font-bold">{fundraiser.title}</span>
            </h1>
            <p className="text-sm text-secondary">
              Your donation will benefit{" "}
              <span className="font-bold">{fundraiser.author}</span>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold  mb-4">Enter your donation</h2>
          <div className="grid grid-cols-3 xs:flex items-center justify-center gap-2 mb-2">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setAmount(preset.value)}
                className={`h-[52px] flex justify-center items-center font-bold w-full border transition-all ${
                  amount === preset.value
                    ? "border-transparent bg-[#252525] text-white"
                    : "border-[#c0bdb8] hover:border-[#6f6f6f] hover:bg-[#2525250d]"
                } ${preset.suggested ? "relative" : ""} rounded-xl`}
              >
                <span className="text-center">{preset.label}</span>
                {preset.suggested && (
                  <span className="absolute translate-x-[-50%] bottom-[-4px] text-nowrap text-[8px] left-[50%] bg-[#cef3bd] text-black px-1 rounded-[624.9375rem]">
                    💚 SUGGESTED
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="w-full p-[0.5rem_0.75rem] border border-[#c0bdb8] items-center rounded-xl leading-6 font-bold flex justify-between">
            <h1 className="text-2xl text-center ">
              $ <br /> <span className="text-sm">USD</span>
            </h1>
            <input
              //   type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-none outline-none w-full text-[2.5rem] font-bold text-right"
            />
            <h1 className="text-[40px] font-bold  text-end">.00</h1>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-base mb-4">Tip GoFundMe services</h2>
          <p className="text-sm text-secondary mb-4">
            GoFundMe has a 0% platform fee for organizers. GoFundMe will
            continue offering its services thanks to donors who will leave an
            optional amount here.
          </p>
          <Slider
            defaultValue={[17.5]}
            value={[tipPercentage]}
            onValueChange={(value) => setTipPercentage(value[0])}
            max={35}
            step={0.5}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">
            {tipPercentage}%
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-3">Payment method</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-2">
              <div className="flex items-center p-3 border rounded-lg">
                <RadioGroupItem value="venmo" id="venmo" />
                <label htmlFor="venmo" className="ml-3">
                  Venmo
                </label>
              </div>
              <div className="flex items-center p-3 border rounded-lg">
                <RadioGroupItem value="google-pay" id="google-pay" />
                <label htmlFor="google-pay" className="ml-3">
                  Google Pay
                </label>
              </div>
              <div className="flex items-center p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <label htmlFor="card" className="ml-3">
                  Credit or debit
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex  flex-col gap-2 mb-6">
          <div className="flex cursor-pointer items-center gap-4">
            <Checkbox className="w-5 h-5" id="anonymous" />
            <p className="text-sm flex items-center gap-1">
              Don't display my name publicly on the fundraiser
            </p>
          </div>
          <div className="flex cursor-pointer items-center gap-4">
            <Checkbox className="w-5 h-5" id="marketing" defaultChecked />
            <p className="text-sm">
              Get occasional marketing updates from GoFundMe. You may
              unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-grey mb-6">
          <h1 className="text-base font-bold mb-4">Your donation</h1>
          <div className="flex justify-between text-[#6f6f6f] text-base mb-2">
            <span>Your donation</span>
            <span>${amount || "0.00"}</span>
          </div>
          <div className="flex justify-between text-[#6f6f6f] text-base mb-[10px]">
            <span>GoFundMe tip</span>
            <span>
              ${((parseFloat(amount) || 0) * (tipPercentage / 100)).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-base pt-4 border-t border-grey font-medium">
            <span>Total due today</span>
            <span>
              $
              {((parseFloat(amount) || 0) * (1 + tipPercentage / 100)).toFixed(
                2
              )}
            </span>
          </div>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-full font-medium mb-4">
          Donate with Google Pay
        </button>

        <p className="text-xs text-gray-500 text-center">
          By clicking Google Pay, you agree to GoFundMe's Terms of Service and
          Privacy Notice. Learn more about options and fees.
        </p>
      </Card>
    </div>
  );
};

export default CheckoutCard;
