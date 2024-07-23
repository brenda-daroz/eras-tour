import { useLatestSurpriseTracks } from "@/hooks/useLatestSurpriseTracks";
import { UITrack } from "@/lib/logic";
import styled from "styled-components";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";

const Latest = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const LatestContainer = styled.div`
  background: linear-gradient(to right, #f8e5d1, #d8c7e3);
  border-bottom: 3px solid #ccc;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  & p {
    font-size: 0.9rem;
    cursor: pointer;
    color: #333;
    margin: 10px;
    border-bottom: 1px dotted grey;
`;

export function LastPlayedSurpriseSongs({ data }: { data: UITrack[] }) {
  const { isOpen, selectedTrack, openModal, closeModal } = useModal();
  const latestSurpriseTracks = useLatestSurpriseTracks(data);

  return (
    <>
      {latestSurpriseTracks.length > 0 && (
        <LatestContainer>
          <Latest>
            <h3 style={{ marginBottom: "0.5rem" }}>
              {"Latest surprise songs:".toUpperCase()}
            </h3>
            <div>
              {latestSurpriseTracks.map((item, index) => (
                <p key={index} onClick={() => openModal(item)}>
                  {item.status.type === "surprise"
                    ? item.status.concertInfo.map(
                        (info) => info.instrument
                      )[0] === "piano"
                      ? "🎹"
                      : "🎸"
                    : null}
                  {"  "} {item.title.toUpperCase()}
                </p>
              ))}
            </div>
          </Latest>
        </LatestContainer>
      )}
      {isOpen && selectedTrack && (
        <Modal onClose={closeModal} track={selectedTrack} />
      )}
    </>
  );
}
