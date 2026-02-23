import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export interface User {
    _id: string;
    email: string;
    role: "admin" | "customer" | "staff";
    profilePic?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    addresses?: any[];
    newsletterSubscribed?: boolean;
    marketingConsent?: boolean;
}


export const useAuthUser = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const { data } = await axios.get("/api/auth/me", {
                withCredentials: true,
            });
            return data.user as User;
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            return data.user as User;
        },

        onSuccess: (user) => {
            queryClient.setQueryData(["authUser"], user);
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};


export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await axios.get("/api/auth/logout", {
                withCredentials: true,
            });
        },

        onSuccess: () => {
            queryClient.setQueryData(["authUser"], null);
            queryClient.setQueryData(["cart"], []);
            queryClient.removeQueries({ queryKey: ["cart"] });
        },
    });
};