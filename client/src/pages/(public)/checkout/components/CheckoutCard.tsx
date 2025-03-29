import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Campaign } from "@/types";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import donationService from "@/services/donation";
import { toast } from "sonner";
import { paths } from "@/constants/paths";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDonationResponseType } from "@/services/donation/types";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  amount: z.number().min(1, "Please enter a valid amount"),
  tip: z.number().min(0).default(0),
  isAnonymous: z.boolean().default(false),
  termsConditions: z.literal<boolean>(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  fundraiser: Campaign;
};

const CheckoutCard = ({ fundraiser }: Props) => {
  const { user } = useAppSelector(selectUserData);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      tip: 0,
      isAnonymous: false,
      termsConditions: true,
    },
  });

  const [paymentMethod, setPaymentMethod] = useState("google-pay");

  const predefinedAmounts = [
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100", suggested: true },
    { value: 150, label: "$150" },
    { value: 200, label: "$200" },
    { value: 500, label: "$500" },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: donationService.create,
    onSuccess: () => {
      toast.success("Donation created successfully");
      navigate(paths.PROFILE.CONTRIBUTIONS);
      form.reset();
    },
    onError: (error: AxiosError<CreateDonationResponseType>) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!user) {
      toast.error("No user logged in");
      return;
    }

    const payload = {
      campaign: fundraiser._id,
      amount: Number(data.amount),
      tip: Number(data.tip) || 0,
      isAnonymous: data.isAnonymous,
    };

    console.log("Donation Payload =>", payload);
    mutate(payload);
  };

  const totalDue = (form.watch("amount") || 0) * (1 + form.watch("tip") / 100);

  return (
    <div className="w-full lg:max-w-[655px] mx-auto">
      <Card className="px-4 py-6 xs:py-8 xs:px-12 rounded-[2.5rem]">
        <div className="flex flex-col lg:flex-row  gap-4 mt-6 mb-6">
          <img
            src={fundraiser.images[0]}
            alt={fundraiser.title}
            className="lg:w-[104px] lg:h-[78px] rounded-[0.5rem] object-cover"
          />
          <div>
            <h1 className="text-base">
              You're supporting{" "}
              <span className="font-bold">{fundraiser.title}</span>
            </h1>
            <p className="text-sm text-secondary">
              Your donation will benefit{" "}
              <span className="font-bold">
                {fundraiser.author.name} {fundraiser.author.surname}
              </span>
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-6">
              <h2 className="font-bold mb-4">Enter your donation</h2>
              <div className="grid grid-cols-3 xs:flex items-center justify-center gap-2 mb-2">
                {predefinedAmounts.map((preset) => (
                  <button
                    type="button"
                    key={preset.value}
                    onClick={() => form.setValue("amount", preset.value)}
                    className={`h-[52px] flex justify-center items-center font-bold w-full border transition-all ${
                      form.getValues("amount") === preset.value
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

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full p-[0.5rem_0.75rem] border border-[#c0bdb8] items-center rounded-xl leading-6 font-bold flex justify-between">
                      <h1 className="text-2xl text-center">
                        $ <br />
                        <span className="text-sm">USD</span>
                      </h1>
                      <FormControl>
                        <input
                          step="any"
                          className="border-none outline-none w-full text-[2.5rem] font-bold text-right"
                          {...field}
                        />
                      </FormControl>
                      <h1 className="text-[40px] font-bold text-end">.00</h1>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-base mb-4">
                Tip GoFundMe services
              </h2>
              <p className="text-sm text-secondary mb-4">
                GoFundMe has a 0% platform fee for organizers. GoFundMe will
                continue offering its services thanks to donors who will leave
                an optional amount here.
              </p>
              <FormField
                control={form.control}
                name="tip"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Slider
                        max={35}
                        step={0.5}
                        value={[field.value]}
                        onValueChange={(val) => field.onChange(val[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <div className="text-center text-sm text-gray-600 mt-1">
                      {field.value}%
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6">
              <h2 className="font-medium mb-3">Payment method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
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

            <div className="flex flex-col gap-2 mb-6">
              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="anonymous"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="anonymous"
                        className="cursor-pointer text-sm"
                      >
                        Don&apos;t display my name publicly on the fundraiser
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <span>${form.watch("amount").toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6f6f6f] text-base mb-[10px]">
                <span>GoFundMe tip</span>
                <span>
                  {(
                    (form.watch("amount") || 0) *
                    (form.watch("tip") / 100)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base pt-4 border-t border-grey font-medium">
                <span>Total due today</span>
                <span>${totalDue.toFixed(2)}</span>
              </div>
            </div>

            <FormField
              control={form.control}
              name="termsConditions"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-black text-white rounded-full font-medium mb-4"
            >
              {isPending ? "Processing..." : "Donate with Google Pay"}
            </button>
          </form>
        </Form>

        <p className="text-xs text-gray-500 text-center">
          By clicking Google Pay, you agree to GoFundMe's Terms of Service and
          Privacy Notice. Learn more about options and fees.
        </p>
      </Card>
    </div>
  );
};

export default CheckoutCard;
