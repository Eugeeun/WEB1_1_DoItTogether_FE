import { useMutation, MutationOptions } from '@tanstack/react-query';
import { postHousework } from './postHousework';
import {
  AddHouseworkReq,
  AddHouseworkRes,
  ChangeHouseworkStatusReq,
  ChangeHouseworkStatusRes,
  DeleteHouseworkReq,
  DeleteHouseworkRes,
  PostAssignHouseworkAIReq,
  PostAssignHouseworkAIRes,
} from '@/types/apis/houseworkApi';
import { PutHouseworkReq, PutHouseworkRes } from '@/types/apis/houseworkApi';
import { putHousework } from '@/services/housework/putHousework';
import { deleteHousework } from '@/services/housework/deleteHouswork';
import { changeHouseworkStatus } from '@/services/housework/changeHouseworkStatus';
import { postAssignHouseworkAi } from '@/services/housework/postAssignHouseworkAi';

export const usePostHouseworkMutation = (
  options?: MutationOptions<AddHouseworkRes, Error, AddHouseworkReq>
) => useMutation({ mutationFn: postHousework, ...options });

export const usePutHouseworkMutation = (
  options?: MutationOptions<PutHouseworkRes, Error, PutHouseworkReq>
) => useMutation({ mutationFn: putHousework, ...options });

export const useDeleteHouseworkMutation = (
  options?: MutationOptions<DeleteHouseworkRes, Error, DeleteHouseworkReq>
) => useMutation({ mutationFn: deleteHousework, ...options });

export const useChangeHouseworkStatusMutation = (
  options?: MutationOptions<ChangeHouseworkStatusRes, Error, ChangeHouseworkStatusReq>
) => useMutation({ mutationFn: changeHouseworkStatus, ...options });

export const usePostAssignHouseworkAiMutation = (
  options?: MutationOptions<PostAssignHouseworkAIRes, Error, PostAssignHouseworkAIReq>
) => useMutation({ mutationFn: postAssignHouseworkAi, ...options });
