import {
  Calendar,
  LayoutDashboard,
  HandCoins,
  CircleDollarSign,
  User,
} from "lucide-react";
import { MySidebar } from "@/app/components/layout/my-sidebar";

const items = [
  {
    id: 1,
    title: "Dashboard",
    url: "./dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Offer",
    url: "./offer",
    icon: HandCoins,
  },
  {
    id: 3,
    title: "Appointment",
    url: "./appointment",
    icon: Calendar,
  },
  {
    id: 4,
    title: "Payments",
    url: "./payments",
    icon: CircleDollarSign,
  },
  {
    id: 5,
    title: "Profile",
    url: "./profile",
    icon: User,
  },
];

export function LenderSidebar() {
  return <MySidebar menuItems={items} />;
}
