import backgroundImage from "@/assets/images/background.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import XeyirLogo from "@/assets/images/xeyir-logo.jpg";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="sm:container sm:py-8 min-h-screen sm:min-h-fit flex items-center justify-center">
        <div className="bg-white py-16 px-8 rounded-[1.25rem] w-full sm:w-[550px]">
          <img src={XeyirLogo} alt="GoFundMe" className="h-12 mx-auto " />

          <h1 className="text-[2rem] text-center mb-2">Welcome</h1>
          <p className="text-center text-[#6b6966]">
            Log in to GoFundMe to continue.
          </p>
          <p className="mb-8 text-center text-sm text-[#6b6966d8]">
            Don't have an account?{" "}
            <a
              onClick={() => navigate(paths.REGISTER)}
              className="underline cursor-pointer"
            >
              Sign up here
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

          <div className="space-y-6">
            <form className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email Address"
                className="h-12"
              />
              <Input type="password" placeholder="Password" className="h-12" />
            </form>

            <Button className="w-full h-12 bg-[#252525] hover:bg-[#252525]/90">
              Continue
            </Button>
          </div>

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

export default LoginPage;
