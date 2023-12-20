import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "@/types";
import { useUserContext } from "@/context/AuthContext";

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[];
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const location = useLocation();
  const { user, isAdmin } = useUserContext();

  if (!items?.length) return null;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon;
        const isActive = item.href && location.pathname.includes(item.href);

        if (item.for === 'admin' && !isAdmin) {
          return null;
        }

        return (
          <React.Fragment key={index}>
            {item.href ? (
              <Link
                to={item.for === "all" ? item.href + user._id : item.href}
                aria-label={item.title}
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noreferrer" : ""}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent font-medium" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-60"
                  )}
                >
                  <Icon className="lg:mr-2 lg:h-5 lg:w-5 h-8 w-h-8" aria-hidden="true" />
                  <span className="hidden lg:block">{item.title}</span>
                </span>
              </Link>
            ) : (
              <span
                className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
              >
                {item.title}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
