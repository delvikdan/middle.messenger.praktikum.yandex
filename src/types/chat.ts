import { UserType } from "@/types/user";

export type ChatType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: UserType;
    time: string;
    content: string;
  };
};
