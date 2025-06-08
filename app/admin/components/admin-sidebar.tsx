import {
  Calendar,
  // LayoutDashboard,
  HandCoins,
  CircleDollarSign,
  User,
} from "lucide-react";

import { MySidebar } from "@/app/components/layout/my-sidebar";

const items = [
  {
    id: 2,
    title: "User Management",
    url: "/admin/user",
    icon: HandCoins,
    children: [
      {
        id: 1,
        title: "Manage Users",
        url: "/admin/user/manage-users",
      },
      {
        id: 4,
        title: "Application History",
        url: "/admin/user/application-history",
      },
    ],
  },
  {
    id: 5,
    title: "Lender Management",
    url: "/admin/lender",
    icon: Calendar,
    children: [
      {
        id: 6,
        title: "Manage Lenders",
        url: "/admin/lender/manage-lenders",
      },
      {
        id: 7,
        title: "Application Offer",
        url: "/admin/lender/application-offer",
      },
      {
        id: 8,
        title: "Offer Reports",
        url: "/admin/lender/offer-reports",
      },
      // {
      //   title: "Payment Management",
      //   url: "lender/payment-management",
      // },
      // {
      //   title: "Invoice Management",
      //   url: "lender/invoice-management",
      // },
    ],
  },
  {
    id: 9,
    title: "Settings & Configurations",
    url: "/admin/settings-configs",
    icon: CircleDollarSign,
  },
  {
    id: 10,
    title: "Profile",
    url: "/admin/profile",
    icon: User,
  },
];

export function AdminSidebar() {
  return <MySidebar menuItems={items} />;
}
