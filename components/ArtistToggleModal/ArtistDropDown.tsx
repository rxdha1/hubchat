import { useArtistProvider } from "@/providers/ArtistProvider";
import { ArtistRecord } from "@/types/Artist";
import { EllipsisVertical, Plus } from "lucide-react";
import Image from "next/image";

const ArtistDropDown = ({ toggleModal }: { toggleModal: () => void }) => {
  const {
    artists,
    artistActive,
    setArtistActive,
    selectedArtist,
    toggleCreation,
    toggleUpdate,
    toggleSettingModal,
  } = useArtistProvider();

  return (
    <div className="absolute min-w-[200px] border-[1px] border-gray-700 rounded-md p-2 bottom-0 right-0 bg-black min-h-[200px] overflow-y-auto">
      <div className="flex flex-col gap-2 max-h-[180px] overflow-x-hidden overflow-y-auto">
        {artists.map((artist: ArtistRecord) => (
          <button
            key={artist.id}
            className="flex gap-2 items-center justify-between"
            type="button"
            onClick={() => {
              toggleUpdate(artist);
              toggleModal();
            }}
          >
            <div className="flex gap-2 items-center">
              <div className="relative w-6 h-6 rounded-md overflow-hidden">
                <Image
                  src={artist.image || "https://i.imgur.com/QCdc8Ai.jpg"}
                  layout="fill"
                  alt="not found icon"
                />
              </div>
              <p className="text-sm">{artist.name}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                toggleSettingModal();
              }}
            >
              <EllipsisVertical />
            </button>
          </button>
        ))}
      </div>
      <button
        className="flex gap-2 items-center mt-1"
        type="button"
        onClick={toggleCreation}
      >
        <Plus />
        <p className="text-sm">New Artist</p>
      </button>
      <div className="h-[0.1px] w-full bg-gray-700 my-2" />
      <div className="flex gap-2 items-center">
        <button
          className="flex items-center border-[1px] border-gray-700 rounded-full w-10 h-[20px] pl-2"
          onClick={() => setArtistActive(!artistActive)}
          type="button"
        >
          <div
            className={`${artistActive ? "translate-x-[calc(100%-5px)]" : "translate-x-[-5px]"} 
                bg-[white] w-[15px] aspect-[1/1] rounded-full 
                transition duration-[300ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
          />
        </button>
        <p className="text-sm">{selectedArtist?.name || "Artist Mode"}</p>
      </div>
    </div>
  );
};

export default ArtistDropDown;
