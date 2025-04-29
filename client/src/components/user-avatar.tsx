import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@shared/schema";

type UserAvatarProps = {
  user: Omit<User, "password"> | null;
  className?: string;
};

export function UserAvatar({ user, className = "" }: UserAvatarProps) {
  if (!user) return null;

  return (
    <Avatar className={`bg-primary-100 text-primary-700 ${className}`}>
      <AvatarFallback className="font-medium">
        {user.avatarInitials || user.fullName?.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
