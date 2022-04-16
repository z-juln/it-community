export type NotificationType = 'provider_apply' | 'study_item_apply' | 'praise' | 'discuss';

export interface Notification {
  id: number;
  uid: number;
  type: NotificationType;
  target_id?: number;
  meta?: any;
  time: string;
  readed: 0 | 1;
}

export default Notification;
