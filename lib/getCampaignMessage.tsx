import { ArtistToolResponse } from "@/types/Tool";
import { v4 as uuidV4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCampaignMessage = (toolName: string | undefined, context: any) => {
  if (
    toolName === "createCampaign" &&
    context.status === ArtistToolResponse.CREATED_CAMPAIGN
  )
    return {
      id: uuidV4(),
      content: `Campaign Id: ${context.data.id}`,
      role: "assistant",
    };

  return null;
};

export default getCampaignMessage;