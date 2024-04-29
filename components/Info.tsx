import React from "react";
import styled from "styled-components";
import {
  faLinkedinIn,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px 200px;
  @media only screen and (min-width: 1600px) {
    display: flex;
    justify-content: space-evenly;
    padding: 0 50px;
    align-items: center;
  }
  @media only screen and (max-width: 648px) {
    padding: 20px 30px;
  }
`;

const Container = styled.footer`
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  @media only screen and (max-width: 700px) {
    padding: 20px 10px;
    flex-direction: column;
    height: 8vh;
  }
  @media only screen and (min-width: 1600px) {
    flex-direction: column;
    height: 100%;
  }
`;

const Author = styled.div`
  font-size: 1rem;
  font-family: "Anonymous Pro", sans-serif;
  text-align: center;
  span {
    padding: 0 5px;
  }
  @media only screen and (min-width: 1600px) {
    font-size: 1.5rem;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #eaaed0;
  font-weight: 700;
  &:hover {
    color: #333;
    transition: 0.3s ease-out;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  font-size: 1.3rem;
  a {
    color: #eaaed0;
    &:hover {
      color: #333;
      transition: 0.3s ease-out;
      transform: scale(1.2);
    }
  }
  @media only screen and (min-width: 1600px) {
    font-size: 2rem;
    width: 150px;
    justify-content: space-evenly;
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-family: "Anonymous Pro", sans-serif;
  color: #020e69;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  padding: 20px 0 5px 0;
  @media only screen and (min-width: 1600px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.1rem;
  font-family: "Anonymous Pro", sans-serif;
  color: #020e69;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin: 5px 0 15px 0;
  @media only screen and (min-width: 1600px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.p`
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5;
  padding: 0;
  @media only screen and (min-width: 1600px) {
    font-size: 1.1rem;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1600px) {
    width: 60%;
  }
`;

const Info = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Taylor Swift - The Eras Tour </Title>
        <Subtitle>Surprise Songs Tracker</Subtitle>
        <Author>
          Website built by a
          <Link href="https://www.brenda.fyi" target="_blank" rel="noreferrer">
          {" "}swiftie{" "}
          </Link>
          to all swifties.
        </Author>
        <Text>
          {`A Brazilian-born, Berlin-based swiftie who's been a fan of Taylor's
          work since 2008, I'm very proud to have created this website. I hope
          you enjoy it as much as I enjoyed building it! Feel free to get in`}
          <Link href="mailto:brenda.daroz@gmail.com">{" "}touch</Link>{" "}
          {`with
          suggestions, feedback, or just to say hi. I'd love to hear from you!`}
        </Text>
        <Text>
          {`This website displays all albums Taylor's put out so far each divided
          into three categories: Surprise, Fixed, and Unplayed. The Surprise
          section showcases the songs she's already performed (even the ones
          she's already repeated), leaving you wondering for what might come
          next. The Fixed category features the must-hear songs that grace every
          concert, ensuring you don't miss out on any of the classics. Lastly,
          the Unplayed section builds up anticipation as it lists the songs
          Taylor has yet to unveil on this tour.`}
        </Text>
        <Text>
          {`By clicking on the surprise songs, a magical modal window appears,
          revealing details such as the date and location of the performance.
          But that's not all! To make your experience even more exciting, each
          surprise song comes with a special TikTok fan video capturing the
          unforgettable moments from that particular performance. It's like
          having a front-row seat to Taylor's concert!`}
        </Text>
        <Text>
          {`I'll be at the Eras Tour in São Paulo nights 2 & 3, Münich night 1,
          and Milan night 1. See you there!`}
        </Text>
      </Header>
      <Container>
        <SocialMedia>
          <a
            href="https://www.linkedin.com/in/brendadz/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://github.com/brenda-daroz"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.twitter.com/brendadrz/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </SocialMedia>
      </Container>
    </Wrapper>
  );
};

export default Info;
