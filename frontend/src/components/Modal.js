import styled from 'styled-components'

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
  background-color: white;
  border-radius: 5px;
  width: 15vw;
  height: 15vh;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  margin: 0 auto;
  @media only screen and (max-width: 700px) {
    width: 50vw;
    height: 10vh;
  }
}`

const ModalText = styled.p`{
  font-size: 0.6rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;

}`

const Modal = ({ setIsOpen, track }) => {
  return (
    <DarkBg onClick={() => setIsOpen(false)}>
      <ModalDiv>
        <ModalText>Song: {track.title}</ModalText>
        <ModalText>Date: {track.status.concertInfo.date}</ModalText>
        <ModalText>Venue: {track.status.concertInfo.venue.name}</ModalText>
        <ModalText>City: {track.status.concertInfo.venue.city.name}</ModalText>
        <ModalText>Country: {track.status.concertInfo.venue.city.country.name}</ModalText>
      </ModalDiv>
    </DarkBg>
  )
}

export default Modal;
