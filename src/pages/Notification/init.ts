import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userInfoState, notificationState } from '@/store';
import apis from '@/apis/notification';

export default function useInit() {
  const userInfo = useRecoilValue(userInfoState);
  const setNotificationState = useSetRecoilState(notificationState);

  useEffect(() => {
    if (userInfo?.uid) {
      apis.getNotificationList()
        .then(res => {
          if (res.code !== 1) {
            throw new Error(res.message);
          }
          const allList = res.data;
          const unReadCount = allList.reduce((total, item) => total + item.readed ? 0 : 1, 0);
          setNotificationState({ unReadCount, list: allList });
        })
    }
  }, [userInfo?.uid]);
}
