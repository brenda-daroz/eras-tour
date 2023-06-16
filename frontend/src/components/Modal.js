import styled from 'styled-components'

const DarkBg = styled.div`{
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 0;
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
  width: 10vw;
  height: 10vh;
  z-index: 999;
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
        <ModalText>Date: {track.info.date}</ModalText>
        <ModalText>City: {track.info.location}</ModalText>
        <ModalText>Venue: {track.info.venue}</ModalText>
      </ModalDiv>
    </DarkBg>
  )
}

export default Modal;
