import AuthRight from "@/components/AuthRight";
import { useFetch } from "@/hooks/useFetch";
import * as S from "@/components/loginStyle";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, fetchData } = useFetch<User[]>();
  const [showError, setShowError] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const URL = `${API_URL}/users`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const rand = function () {
    return Math.random().toString(36).substr(2);
  };

  const token = function () {
    return rand() + rand();
  };

  useEffect(() => {
    fetchData(URL, options);
  }, []);

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = data?.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setEmail("");
      setPassword("");
      Cookie.set("id", user.id.toString());
      Cookie.set("role", user.role);
      Cookie.set("token", token());
      const role = Cookie.get("role");
      if (role === "admin") {
        toast.success("Login successful");
        return router.push("/dashboard");
      }
      toast.success("Login successful");
      return router.push("/home");
    }

    toast.error("Login failed");
    setShowError(true);
    return;
  };

  const handleChangeSignUp = () => {
    router.push("/auth/signup");
  };
  return (
    <S.AuthContainer>
      <S.AuthContent>
        <S.LogoContainer>
          <S.Logo>EVERFIT</S.Logo>
        </S.LogoContainer>
        <S.FormContent>
          <S.LoginFormHeader>Log In</S.LoginFormHeader>
          <S.LoginForm onSubmit={handleSubmitLogin}>
            <S.FormItem>
              <S.FormLabel>
                Email
                <S.FormInput
                  onChange={handleChangeEmail}
                  value={email}
                  type="email"
                  placeholder="Your email here..."
                  id="email"
                  required
                ></S.FormInput>
              </S.FormLabel>
              {showError ? (
                <S.FormError>Email or Password is Wrong!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.FormItem>
              <S.FormLabel>
                Password
                <S.FormInput
                  onChange={handleChangePassword}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Your password here..."
                  required
                ></S.FormInput>
              </S.FormLabel>
              {showError ? (
                <S.FormError>Email or Password is Wrong!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.SubmitForm type="submit" value="Log In"></S.SubmitForm>
          </S.LoginForm>
          <S.HaveAccount>
            Have an account?{" "}
            <S.SignUpAnchor onClick={handleChangeSignUp}>
              Sign Up here
            </S.SignUpAnchor>
          </S.HaveAccount>
        </S.FormContent>
      </S.AuthContent>
      <AuthRight />
    </S.AuthContainer>
  );
};

export default Login;
