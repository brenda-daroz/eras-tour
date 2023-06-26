import styled from "styled-components";

const Container = styled.footer`
  height: 8vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  @media only screen and (max-width: 700px) {
    padding: 20px 10px;
    flex-direction: column;
    height: 8vh;
  }
`;

const Author = styled.div`
  font-size: 1rem;
  font-family: "Anonymous Pro", sans-serif;
    a {
    text-decoration: none;
    color: #020E69;
    font-weight: 700;
    &:hover {
      color: #EAAED0;
      transition: 0.3s ease-out;
    }
    }
`;


const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  font-size: 1.3rem;
   a {
    color: #EAAED0;
    &:hover {
      color: #333;
      transition: 0.3s ease-out;
      transform: scale(1.2);
    }
   }
`;


const Footer = () => {
  return (
    <Container>

      <Author>Made by <a href="https://www.brenda.fyi">brenda daroz</a> © 2023</Author>
      <SocialMedia>
        <a href="https://www.linkedin.com/in/brendadz/"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="https://github.com/brenda-daroz"><i class="fa-brands fa-github"></i></a>
      </SocialMedia>

    </Container>
  );
}


export default Footer;
