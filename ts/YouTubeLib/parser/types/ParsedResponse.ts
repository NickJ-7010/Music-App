import type { Memo, ObservedArray, SuperParsedResult, YTNode } from '../helpers';

import type {
  ReloadContinuationItemsCommand, Continuation, GridContinuation,
  ItemSectionContinuation, LiveChatContinuation, MusicPlaylistShelfContinuation, MusicShelfContinuation,
  PlaylistPanelContinuation, SectionListContinuation, ContinuationCommand
} from '../index';

import type PlayerCaptionsTracklist from '../classes/PlayerCaptionsTracklist';
import type CardCollection from '../classes/CardCollection';
import type Endscreen from '../classes/Endscreen';
import type AudioOnlyPlayability from '../classes/AudioOnlyPlayability';
import type Format from '../classes/misc/Format';
import type PlayerLiveStoryboardSpec from '../classes/PlayerLiveStoryboardSpec';
import type PlayerStoryboardSpec from '../classes/PlayerStoryboardSpec';
import type VideoDetails from '../classes/misc/VideoDetails';
import type Alert from '../classes/Alert';
import type AlertWithButton from '../classes/AlertWithButton';
import type NavigationEndpoint from '../classes/NavigationEndpoint';
import type PlayerAnnotationsExpanded from '../classes/PlayerAnnotationsExpanded';
import type EngagementPanelSectionList from '../classes/EngagementPanelSectionList';
import type { AppendContinuationItemsAction } from '../nodes';

export interface IParsedResponse {
  actions?: SuperParsedResult<YTNode>;
  actions_memo?: Memo;
  contents?: SuperParsedResult<YTNode>;
  contents_memo?: Memo;
  header?: SuperParsedResult<YTNode>;
  header_memo?: Memo;
  sidebar?: YTNode;
  sidebar_memo?: Memo;
  live_chat_item_context_menu_supported_renderers?: YTNode;
  live_chat_item_context_menu_supported_renderers_memo?: Memo;
  items_memo?: Memo;
  on_response_received_actions?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_actions_memo?: Memo;
  on_response_received_endpoints?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_endpoints_memo?: Memo;
  on_response_received_commands?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_commands_memo?: Memo;
  continuation?: Continuation;
  continuation_contents?: ItemSectionContinuation | SectionListContinuation | LiveChatContinuation | MusicPlaylistShelfContinuation |
  MusicShelfContinuation | GridContinuation | PlaylistPanelContinuation | ContinuationCommand;
  continuation_contents_memo?: Memo;
  metadata?: SuperParsedResult<YTNode>;
  microformat?: YTNode;
  overlay?: YTNode;
  alerts?: ObservedArray<Alert | AlertWithButton>;
  refinements?: string[];
  estimated_results?: number;
  player_overlays?: SuperParsedResult<YTNode>;
  playback_tracking?: {
    videostats_watchtime_url: string;
    videostats_playback_url: string;
  };
  playability_status?: IPlayabilityStatus;
  streaming_data?: IStreamingData;
  player_config?: IPlayerConfig;
  current_video_endpoint?: NavigationEndpoint;
  endpoint?: NavigationEndpoint;
  captions?: PlayerCaptionsTracklist;
  video_details?: VideoDetails;
  annotations?: ObservedArray<PlayerAnnotationsExpanded>;
  storyboards?: PlayerStoryboardSpec | PlayerLiveStoryboardSpec;
  endscreen?: Endscreen;
  cards?: CardCollection;
  engagement_panels?: ObservedArray<EngagementPanelSectionList>;
  items?: SuperParsedResult<YTNode>;
  entries?: SuperParsedResult<YTNode>;
  entries_memo?: Memo;
  continuation_endpoint?: YTNode;
}

export interface IPlayerConfig {
  audio_config: {
    loudness_db?: number;
    perceptual_loudness_db?: number;
    enable_per_format_loudness: boolean;
  };
  stream_selection_config: {
    max_bitrate: string;
  };
  media_common_config: {
    dynamic_readahead_config: {
      max_read_ahead_media_time_ms: number;
      min_read_ahead_media_time_ms: number;
      read_ahead_growth_rate_ms: number;
    };
  };
}

export interface IStreamingData {
  expires: Date;
  formats: Format[];
  adaptive_formats: Format[];
  dash_manifest_url: string | null;
  hls_manifest_url: string | null;
}

export interface IPlayerResponse {
  captions?: PlayerCaptionsTracklist;
  cards?: CardCollection;
  endscreen?: Endscreen;
  microformat?: YTNode;
  annotations?: ObservedArray<PlayerAnnotationsExpanded>;
  playability_status: IPlayabilityStatus;
  streaming_data?: IStreamingData;
  player_config: IPlayerConfig;
  playback_tracking?: {
    videostats_watchtime_url: string;
    videostats_playback_url: string;
  };
  storyboards?: PlayerStoryboardSpec | PlayerLiveStoryboardSpec;
  video_details?: VideoDetails;
}

export interface IPlayabilityStatus {
  status: string;
  error_screen: YTNode | null;
  audio_only_playablility: AudioOnlyPlayability | null;
  embeddable: boolean;
  reason: string;
}

export interface INextResponse {
  contents?: SuperParsedResult<YTNode>;
  contents_memo?: Memo;
  current_video_endpoint?: NavigationEndpoint;
  on_response_received_endpoints?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_endpoints_memo?: Memo;
  player_overlays?: SuperParsedResult<YTNode>;
  engagement_panels?: ObservedArray<EngagementPanelSectionList>;
}

export interface IBrowseResponse {
  continuation_contents?: ItemSectionContinuation | SectionListContinuation | LiveChatContinuation | MusicPlaylistShelfContinuation |
  MusicShelfContinuation | GridContinuation | PlaylistPanelContinuation;
  continuation_contents_memo?: Memo;
  on_response_received_actions: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_actions_memo: Memo;
  on_response_received_endpoints?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  on_response_received_endpoints_memo?: Memo;
  contents?: SuperParsedResult<YTNode>;
  contents_memo?: Memo;
  header?: SuperParsedResult<YTNode>;
  header_memo?: Memo;
  metadata?: SuperParsedResult<YTNode>;
  microformat?: YTNode;
  alerts?: ObservedArray<Alert | AlertWithButton>;
  sidebar?: YTNode;
  sidebar_memo?: Memo;
}

export interface ISearchResponse {
  header?: SuperParsedResult<YTNode>;
  header_memo?: Memo;
  contents?: SuperParsedResult<YTNode>;
  contents_memo?: Memo;
  on_response_received_commands?: ObservedArray<ReloadContinuationItemsCommand | AppendContinuationItemsAction>;
  continuation_contents?: ItemSectionContinuation | SectionListContinuation | LiveChatContinuation | MusicPlaylistShelfContinuation |
  MusicShelfContinuation | GridContinuation | PlaylistPanelContinuation;
  continuation_contents_memo?: Memo;
  refinements?: string[];
  estimated_results: number;
}

export interface IResolveURLResponse {
  endpoint: NavigationEndpoint;
}

export interface IGetTranscriptResponse {
  actions: SuperParsedResult<YTNode>;
  actions_memo: Memo;
}

export interface IGetNotificationsMenuResponse {
  actions: SuperParsedResult<YTNode>;
  actions_memo: Memo;
}

export interface IUpdatedMetadataResponse {
  actions: SuperParsedResult<YTNode>;
  actions_memo: Memo;
  continuation?: Continuation;
}

export interface IGuideResponse {
  items: SuperParsedResult<YTNode>;
  items_memo: Memo;
}
