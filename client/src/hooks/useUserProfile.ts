import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";
import type { UserProfile } from "../types/UserProfile";

const fetchUserProfile = async (): Promise<UserProfile> => {
  const res = await axios.get("/api/auth/me", { withCredentials: true });
  return res.data.user;
};

const patchUserProfile = async (data: UserProfile): Promise<UserProfile> => {
  const res = await axios.patch(`/api/auth/me`, data, {
    withCredentials: true,
  });
  return res.data.user;
};

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, refetch } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const mutation = useMutation<UserProfile, unknown, UserProfile>({
    mutationFn: patchUserProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["userProfile"], updatedUser);
    },
  });

  return {
    user,
    isLoading,
    isError,
    refetch,
    updateProfile: mutation.mutate,
    updateLoading: mutation.isLoading,
    updateError: mutation.isError,
  };
};

