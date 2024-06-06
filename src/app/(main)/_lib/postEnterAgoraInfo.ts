import fetchWrapper from '@/lib/fetchWrapper';
import { getToken } from '@/lib/getToken';
import showToast from '@/utils/showToast';
import tokenManager from '@/utils/tokenManager';

type Props = {
  info: {
    name?: string,
    id?: number,
    file?: string,
    role: 'PROS' | 'CONS' | 'OBSERVER',
    nickname?: string,
  },
  agoraId: number,
};

// eslint-disable-next-line import/prefer-default-export
export const postEnterAgoraInfo = async ({ info, agoraId }: Props) => {
  // 토큰을 가지고 있는지 확인
  if (tokenManager.getToken() === undefined) {
    await getToken();
  }

  const res = await fetchWrapper.call(`/api/v1/auth/agoras/${agoraId}/participants`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenManager.getToken()}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      nickname: info.nickname ? info.nickname : '',
      photo_num: info.id ? info.id : 1,
      type: info.role,
      voteType: null,
    }),
  });

  if (res.success === false) {
    console.log(res.error);
    if (res.error.code === 1001) {
      if (info.id === null) {
        showToast('프로필을 선택해주세요.', 'error');
      } else if (info.nickname === null) {
        showToast('닉네임을 입력해주세요.', 'error');
      } else if (info.role !== 'OBSERVER' && info.role !== 'PROS' && info.role !== 'CONS') {
        showToast('허용되지 않는 입장 타입 입니다.', 'error');
      } else {
        showToast('입장 실패했습니다.\n 다시 시도해주세요.', 'error');
      }

      return null;
    }
  }

  const result = res.response;

  return result;
};
