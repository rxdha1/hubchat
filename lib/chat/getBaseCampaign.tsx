import { getSupabaseServerAdminClient } from "@/packages/supabase/src/clients/server-admin-client";
import { FAN_TYPE } from "@/types/fans";
import getStreamsCount from "./getStreamsCount";
import limitCollection from "../limitCollection";
import getTopSongListeningFansCount from "./getTopSongListeningFansCount";

const getBaseCampaign = async (artistId: string, email: string) => {
  const client = getSupabaseServerAdminClient();
  const { data: campaign } = await client.rpc("get_campaign", {
    email,
    artistid: artistId,
    campaignid: "",
  });

  const premiumCount =
    campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "premium")
      ?.length || 0;
  const freeCount =
    campaign?.fans?.filter((fan: FAN_TYPE) => fan.product === "free")?.length ||
    0;
  const episodes_names = campaign?.episodes.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (episode: any) => episode.name,
  );
  const episodes_descriptions = campaign?.episodes.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (episode: any) => episode.description,
  );
  const average_streamed_count = await getStreamsCount(client, artistId, email);
  const top_song_listening_fans_count = await getTopSongListeningFansCount(
    artistId,
    email,
  );

  return {
    tracks: limitCollection(campaign?.tracks || []),
    artists: limitCollection(campaign?.artists || []),
    playlists: limitCollection(campaign?.playlist || []),
    albums: limitCollection(campaign?.albums || []),
    audioBooks: limitCollection(campaign?.audio_books || []),
    episodes: limitCollection(episodes_names || []),
    episodes_descriptions: limitCollection(episodes_descriptions),
    shows: limitCollection(campaign?.shows || []),
    genres: limitCollection(campaign?.genres || []),
    premium_spotify_fans_count: premiumCount,
    free_spotify_fans_count: freeCount,
    spotify_fans_count: premiumCount + freeCount,
    total_unique_fans_count: campaign?.fans.length || 0,
    playlists_count: campaign?.playlist?.length || 0,
    average_streamed_count,
    top_song_listening_fans_count,
    fans: limitCollection(campaign?.fans || [], 500),
  };
};

export default getBaseCampaign;
