"use client"

import styled from "styled-components";
// import { faLinkedinIn } from "@fortawesome/free-regular-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub  } from "@fortawesome/free-brands-svg-icons";
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
`

const Container = styled.footer`
  height: 8vh;
  display: flex;
  justify-content:center;
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
  //  align-items: start;
  //  justify-content: center;
  }

`;

const Author = styled.div`
  font-size: 1rem;
  font-family: "Anonymous Pro", sans-serif;
  text-align: center;
    a {
    text-decoration: none;
    color: #EAAED0;
    font-weight: 700;
    &:hover {
      color: #333;
      transition: 0.3s ease-out;
    }
    }
    span {
      padding: 0 5px;
    }
  @media only screen and (min-width: 1600px) {
    font-size: 1.5rem;
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
  @media only screen and (min-width: 1600px) {
    font-size: 2rem;
    width: 100%;
    justify-content: space-evenly;
    padding: 20px 0;
  }
`;

const Title = styled.h1`
font-size: 1.1rem;
font-family: "Anonymous Pro", sans-serif;
color: #020E69;
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
color: #020E69;
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
// color: pink;
// font-weight: 700;
text-align: center;
padding: 0;
@media only screen and (min-width: 1600px) {
   font-size: 1.1rem;
}
  }`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1600px) {
    width: 60%;
  }

}`


const Info = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Taylor Swift - The Eras Tour </Title>
        <Subtitle>Surprise Songs Tracker</Subtitle>
        <Author>Website built by a <a href="https://www.brenda.fyi" target="_blank" rel="noreferrer">swiftie </a>to all swifties.</Author>
        {/* <Text>Website built by a swiftie to all swifties.</Text> */}
        <Text>
          With all Taylor's albums organized, you'll find her repertoire divided into three categories: Surprise, Fixed, and Unplayed. The Surprise section showcases the songs she's already performed, leaving you on the edge of your seat for what might come next. The Fixed category features the must-hear songs that grace every concert, ensuring you don't miss out on any fan-favorite classics. Lastly, the Unplayed section builds up anticipation as it lists the songs Taylor has yet to unveil on this tour.
        </Text>
        <Text>
          By clicking on the surprise songs, a magical modal window appears, revealing details such as the date and location of the performance. But that's not all! To make your experience even more exciting, each surprise song comes with a special TikTok fan video capturing the unforgettable moments from that particular performance. It's like having a front-row seat to Taylor's concert!
        </Text>
      </Header>
      <Container>
        {/* <Author>Made by <a href="https://www.brenda.fyi" target="_blank" rel="noreferrer">brenda daroz</a> © 2023<span><FontAwesomeIcon icon={faHeart} style={{ color: "#9512af", }}/></span></Author> */}
        <SocialMedia>
          <a href="https://www.linkedin.com/in/brendadz/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a href="https://github.com/brenda-daroz" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub}/></a>
        </SocialMedia>
      </Container>
    </Wrapper>
  );
}


export default Info;
