import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import SubscriptionNotificationToggleButton from './SubscriptionNotificationToggleButton';
import Text from './misc/Text';

export default class SubscribeButton extends YTNode {
  static type = 'SubscribeButton';

  title: Text;
  subscribed: boolean;
  enabled: boolean;
  item_type: string;
  channel_id: string;
  show_preferences: boolean;
  subscribed_text: Text;
  unsubscribed_text: Text;
  notification_preference_button: SubscriptionNotificationToggleButton | null;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.buttonText);
    this.subscribed = data.subscribed;
    this.enabled = data.enabled;
    this.item_type = data.type;
    this.channel_id = data.channelId;
    this.show_preferences = data.showPreferences;
    this.subscribed_text = new Text(data.subscribedButtonText);
    this.unsubscribed_text = new Text(data.unsubscribedButtonText);
    this.notification_preference_button = Parser.parseItem(data.notificationPreferenceButton, SubscriptionNotificationToggleButton);
    this.endpoint = new NavigationEndpoint(data.serviceEndpoints?.[0] || data.onSubscribeEndpoints?.[0]);
  }
}