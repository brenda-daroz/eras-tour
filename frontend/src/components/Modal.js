import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DarkBg = styled.div`{
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`

const ModalDiv = styled.div`{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  background-color: white;
  border-radius: 5px;
  width: 70%;
  padding: 10px 20px;
  top: 50%;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, -50%);
  position: absolute;
  margin: 0 auto;
  @media only screen and (max-width: 700px) {
    width: 50%;
  }
}`

const ModalText = styled.p`{
  font-size: 0.7rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
}`

const ModalTtitle = styled.h3`{
  font-size: 0.8rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  text-transform: uppercase;
}`

const Anchor = styled.a`{
  color: black;
  text-decoration: none;
  font-size: 0.8rem;
  background-color: pink;
  padding: 3px 6px;
  border-radius: 5px;
  margin-top: 5px;
}`

const CloseButton = styled.button`{
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  // border-radius: 50%;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  // padding: 2px;
  &:hover {
    color: #EAAED0;
    transition: 0.3s ease-out;
  }
}`


const Modal = ({ setIsOpen, track }) => {
  return (
    <>
      <DarkBg onClick={() => setIsOpen(false)}>
      </DarkBg>
      <ModalDiv onclick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsOpen(false)}><i class="fa-solid fa-xmark"></i></CloseButton>
        <ModalTtitle>{track.title}</ModalTtitle>
        <ModalText>Date: {track.status.concertInfo.date}</ModalText>
        <ModalText>Venue: {track.status.concertInfo.venue.name}</ModalText>
        <ModalText>City: {track.status.concertInfo.venue.city.name}</ModalText>
        <ModalText>Country: {track.status.concertInfo.venue.city.country.name}</ModalText>
        {(track.video) ? <ModalText><Anchor href={track.video} target="_blank" rel="noreferrer">Live Performance (TikTok)</Anchor></ModalText> : null}
      </ModalDiv>
    </>
  )
}

export default Modal;
