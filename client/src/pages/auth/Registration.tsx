import backgroundImage from "@/assets/images/background.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import XeyirLogo from "@/assets/images/xeyir-logo.jpg";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { toast } from "sonner";
import { AuthResponseType } from "@/services/auth/types";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    surname: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const RegistrationPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate(paths.LOGIN);
    },
    onError: (error: AxiosError<AuthResponseType>) => {
      console.log(error.response?.data?.message);
      const message = error.response?.data?.message || "An error ocurred";
      toast.error(message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values);
  }
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="sm:container sm:py-8 min-h-screen sm:min-h-fit flex items-center justify-center">
        <div className="bg-white py-16 px-8 rounded-[1.25rem] w-full  sm:w-[550px]">
          <img src={XeyirLogo} alt="GoFundMe" className="h-12 mx-auto " />

          <h1 className="text-[2rem] text-center mb-2">Welcome</h1>
          <p className="text-center text-[#6b6966] ">
            Sign up to GoFundMe to continue.{" "}
          </p>
          <p className="mb-8 text-center text-sm text-[#6b6966d8]">
            Already have an account?{" "}
            <a
              onClick={() => navigate(paths.LOGIN)}
              className="underline cursor-pointer"
            >
              Log in here
            </a>
          </p>

          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full h-12 font-normal">
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-12 font-normal">
              <FaApple className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] bg-[#e5e1d7] flex-1" />
            <span className="text-[#6b6966]">or</span>
            <div className="h-[1px] bg-[#e5e1d7] flex-1" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full h-12 bg-[#252525] hover:bg-[#252525]/90"
                type="submit"
                disabled={isPending}
              >
                Register
              </Button>
            </form>
          </Form>

          <p className="text-xs text-[#6b6966] mt-6">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="text-[#252525] underline hover:no-underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#252525] underline hover:no-underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
