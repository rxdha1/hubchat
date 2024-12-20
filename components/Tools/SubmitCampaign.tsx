import { useChatProvider } from "@/providers/ChatProvider";
import { v4 as uuidV4 } from "uuid";

const SubmitCampaign = () => {
  const { append } = useChatProvider();

  const handleSubmit = async () => {
    append({
      id: uuidV4(),
      content: `Create a new campaign.`,
      role: "user",
    });
  };
  return (
    <div>
      <p className="text-sm">{`You don't manage any campaign.`}</p>
      <button
        type="button"
        className="border-[1px] border-gray-700 px-2 py-1 rounded-full mt-3 text-sm"
        onClick={handleSubmit}
      >
        Create a new campaign
      </button>
    </div>
  );
};

export default SubmitCampaign;
