export const AGORA_STATUS = {
  RUNNING: 'RUNNING',
  CLOSED: 'CLOSED',
  QUEUED: 'QUEUED',
} as const;

export const AGORA_POSITION = {
  OBSERVER: 'OBSERVER',
  PROS: 'PROS',
  CONS: 'CONS',
  DEFAULT: 'DEFAULT',
} as const;

export const AGORA_CREATE = {
  DEFAULT_PARTICIPANTS_CNT: 5,
  MAX_PARTICIPANTS_CNT: 5,
  MIN_PARTICIPANTS_CNT: 1,
  DEFAULT_TIME: 60,
  MIN_DISCUSSION_TIME: 30,
  MAX_DISCUSSION_TIME: 180,
  MAX_PARTICIPANTS_CNT_MESSAGE: '최대 참여 인원은 각 5명입니다.',
  MIN_PARTICIPANTS_CNT_MESSAGE: '최소 참여 인원은 각 1명입니다.',
  MIN_TIME_MESSAGE: '최소 제한시간은 30분입니다.',
  MAX_TIME_MESSAGE: '최대 제한시간은 180분입니다.',
};