import { styled } from "styled-components";

const ImageContainer = styled.div`
  width: 50%;
  height: 100vh;
  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    width: 0%;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AuthRight = () => {
  return (
    <ImageContainer>
      <Image src="/images/auth.png" alt="close up gym photo" />
    </ImageContainer>
  );
};

export default AuthRight;
