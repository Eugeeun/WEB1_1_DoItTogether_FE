import { useMutation, MutationOptions } from '@tanstack/react-query';
import { postFcmToken } from '@/services/fcm/postFcmToken';
import { PostTokenToServerReq, PostTokenToServerRes } from '@/types/apis/fcmApi';
import { postFcmPush } from './postFcmPush';
import { PushNotificationReq, PushNotificationRes } from '@/types/apis/fcmApi';
import { deleteFcmToken } from '@/services/fcm/deleteFcmToken';
import { DeleteTokenFromServerReq, DeleteTokenFromServerRes } from '@/types/apis/fcmApi';

// options는 사용하는 쪽에서 덮어쓰기가 가능
export const usePostFcmTokenMutation = (
  options?: MutationOptions<PostTokenToServerRes, Error, PostTokenToServerReq>
) => useMutation({ mutationFn: postFcmToken, ...options });

export const usePostFcmPushMutation = (
  options?: MutationOptions<PushNotificationRes, Error, PushNotificationReq>
) => useMutation({ mutationFn: postFcmPush, ...options });

export const useDeleteFcmTokenMutation = (
  options?: MutationOptions<DeleteTokenFromServerRes, Error, DeleteTokenFromServerReq>
) => useMutation({ mutationFn: deleteFcmToken, ...options });
