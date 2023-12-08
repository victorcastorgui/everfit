import { styled } from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 2.25rem;
  margin-top: 2.5rem;
`;
export const Logo = styled.h1`
  font-size: 2.5rem;
`;
export const AuthContent = styled.div`
  width: 50%;
  @media (max-width: 800px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
export const FormContent = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 3rem;
`;
export const SignUpFormHeader = styled.h2`
  font-size: 2.5rem;
  margin-top: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: black;
`;
export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FormLabel = styled.label`
  font-size: 1.25rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  color: black;
`;
export const FormInput = styled.input`
  padding: 0.75rem;
  border-radius: 0.3125rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
export const FormError = styled.p`
  color: red;
`;
export const SubmitForm = styled.input`
  padding: 0.75rem;
  text-align: center;
  border-radius: 0.3125rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  color: white;
  background-color: black;
`;
export const HaveAccount = styled.p`
  margin-top: 2rem;
  color: black;
`;
export const LoginAnchor = styled.a`
  font-weight: 600;
  cursor: pointer;
  color: black;
`;
