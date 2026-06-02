"use client";

import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/utils/useToasts";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/libs/users/models";
import USER_MOCKUP from "@/constants/userMockup";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const loginSubmitted = (data: LoginPayload) => {
    setIsLoading(true);
    const { email, password } = data;
    const userFound = USER_MOCKUP.find(
      (user) => user.email === email && user.password === password,
    );

    console.log(userFound);
    if (userFound) {
      showToast("Login successful!", "success");
      document.cookie = `userAuth=${JSON.stringify({ email, role: userFound.role, username: userFound.name })}; path=/`;
      router.push("/job-list");
    } else {
      showToast("Invalid email or password", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasToken = document.cookie.includes("userAuth=");

      if (hasToken) {
        router.replace("/job-list");
      }
    }
  }, [router]);

  return (
    <Layout>
      <div className="bg-white flex flex-col items-center min-h-full min-w-full text-gray-800 pt-30 gap-10">
        <div className="flex items-center gap-4">
          <p className="font-bold text-2xl"> Court Reporting</p>
        </div>
        <div className=" bg-white/65 w-full max-w-xl min-h-[40vh] rounded-lg shadow-lg overflow-hidden border border-gray-300 flex ">
          <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit(loginSubmitted)}>
              <Input
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                errorMsg={errors.email?.message}
                prefix={<Mail size={18} />}
                label="Email"
                placeholder="Enter email here..."
              />
              <Input
                required
                prefix={<Lock size={18} />}
                suffix={
                  <button
                    className="px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewPassword(!viewPassword);
                    }}
                  >
                    {viewPassword ? (
                      <Eye size={16} color="gray" />
                    ) : (
                      <EyeClosed size={16} color="gray" />
                    )}
                  </button>
                }
                type={viewPassword ? "text" : "password"}
                label="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                errorMsg={errors.password?.message}
                placeholder="Enter password here..."
              />
              {isLoading ? (
                <Button className="w-full" variant="primary">
                  <LoadingSpinner isOpen={isLoading} />
                </Button>
              ) : (
                <Button className="w-full" variant="primary" type="submit">
                  Login
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
