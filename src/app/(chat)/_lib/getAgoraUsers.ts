/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { AgoraSideBarDataType } from '@/app/model/Agora';
import { QueryFunction } from '@tanstack/react-query';
import { getAgoraUserListQueryKey as getAgoraUserListTags } from '@/constants/queryKey';
import { callFetchWrapper } from '@/lib/fetchWrapper';
import { getSession } from '@/serverActions/auth';
import { AUTH_MESSAGE, SIGNIN_REQUIRED } from '@/constants/authErrorMessage';
import {
  AGORA_USER,
  NETWORK_ERROR_MESSAGE,
} from '@/constants/responseErrorMessage';
import isNull from '@/utils/validation/validateIsNull';

export const getAgoraUsers: QueryFunction<
  AgoraSideBarDataType,
  [string, string, string]
> = async ({ queryKey }) => {
  const [_1, _2, agoraId] = queryKey;

  const session = await getSession();
  if (isNull(session)) {
    throw new Error(SIGNIN_REQUIRED);
  }

  const res = await callFetchWrapper<AgoraSideBarDataType>(
    `/api/v1/open/agoras/${agoraId}/users`,
    {
      next: {
        tags: getAgoraUserListTags(Number(agoraId)),
      },
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok && !res.success) {
    if (!res.error) {
      throw new Error(AGORA_USER.UNKNOWN_ERROR);
    }

    const errorMessage =
      typeof res.error.message === 'string' ? res.error.message : 'ERROR';

    if (res.error.code === 1301) {
      throw new Error(AGORA_USER.NOT_FOUND_AGORA);
    } else if (res.error.code === -1) {
      throw new Error(errorMessage);
    } else if (res.error.code === 503) {
      throw new Error(NETWORK_ERROR_MESSAGE.OFFLINE);
    } else if (AUTH_MESSAGE.includes(errorMessage)) {
      throw new Error(errorMessage);
    }

    throw new Error(AGORA_USER.FAILED_TO_GET_AGORA_USER);
  }

  if (isNull(res.response)) {
    throw new Error(AGORA_USER.UNKNOWN_ERROR);
  }

  const result = res.response;

  return result;
};
