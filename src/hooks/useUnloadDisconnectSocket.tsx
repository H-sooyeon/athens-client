'use client';

import { AGORA_STATUS } from '@/constants/agora';
import { useAgora } from '@/store/agora';
import { useWebSocketClient } from '@/store/webSocket';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

type Props = {
  mutation?: () => void;
};

export function useUnloadDisconnectSocket({ mutation }: Props) {
  const { webSocketClient } = useWebSocketClient(
    useShallow((state) => ({
      webSocketClient: state.webSocketClient,
      webSocketClientConnected: state.webSocketClientConnected,
    })),
  );

  const handleUnload = useCallback(() => {
    webSocketClient?.deactivate();
    const currentStatus = useAgora.getState().enterAgora.status;

    if (currentStatus !== AGORA_STATUS.CLOSED) {
      mutation?.();
    }
  }, [webSocketClient, mutation]);

  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (window) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('unload', handleUnload);
    }
    return () => {
      if (window) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
      }
    };
  }, [mutation, handleUnload, handleBeforeUnload]);
}
