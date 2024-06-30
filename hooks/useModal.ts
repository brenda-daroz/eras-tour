import { useState, useEffect } from "react";
import { UITrack } from "@/lib/logic";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<UITrack | null>(null);

  const openModal = (track: UITrack) => {
    setSelectedTrack(track);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTrack(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return { isOpen, selectedTrack, openModal, closeModal };
}
