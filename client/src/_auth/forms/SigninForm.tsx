import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SigninValidation } from "@/lib/validation";
import { Icons, } from "@/components/icons";
import { useSignInAccount } from "@/lib/react-query/queries";
import { IUser } from "@/types";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "sonner";

interface AuthResponse {
  data?: any;
  error?: any;
  status?: any;
}

const SigninForm = () => {

  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  const [type, setType] = useState<'password' | 'text'>('password');

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const { mutateAsync: signInAccount, isPending: loadingUser } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session: AuthResponse = await signInAccount(user);
      if (session.error && session.error.error === "Incorrect email or password") {
        toast.error('Incorrect email or password')
      }
      const isUser = await checkAuthUser();
      if (session.data && session.data.status === "success" && isUser) {
        const user = session.data.data.user as IUser
        toast.success(`Nice to see you back ${user.firstName}`)
        navigate("/");
      }
    } catch (error) {
      toast.error('Unknown Error', {
        description: `Unknown Error at Sign In: ${error}`,
      })
    }
  };

  return (
    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 rounded-xl shadow-lg">
      <div className="flex justify-center mx-auto">
        <img className="w-auto h-7 sm:h-8" src="" alt="" />
      </div>

      <p className="mt-3 text-2xl text-center text-gray-600 dark:text-gray-200">
        Welcome back!
      </p>

      <Link to={""} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <Icons.google className="w-6 h-6" />
        <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
      </Link>

      <div className="flex items-center justify-between mt-6">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

        <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or login with email</div>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignin)} className="flex flex-col gap-5 w-full mt-4">

          <div className="mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" className="block w-full px-4 py-2 h-12 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between mt-2">
                    <FormLabel className="shad-form_label">Password</FormLabel>
                    <Link to="/forgot-password" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</Link>
                  </div>
                  <div className="relative">
                    <FormControl className="flex-grow pr-10">
                      <Input type={type} maxLength={35} placeholder="Password" className="block w-full px-4 py-2 h-12 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" {...field} />
                    </FormControl>
                    <span className="absolute right-3 top-3 cursor-pointer" onClick={handleToggle}>
                      {type === 'password' ? <Eye /> : <EyeOff />}
                    </span>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={loadingUser} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              {loadingUser ? <><Loader2 className="animate-spin h-5 w-5 mr-3" />Processing...</> : <>log in</>}
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex items-center justify-between mt-5 mb-10">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <Link to={"/sign-up"} className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  );
};
export default SigninForm;