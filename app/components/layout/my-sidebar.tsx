import { ChevronDown, Loader2, LucideProps } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/lib/sidebar";
import Link from "next/link";
import { ScrollArea } from "../lib/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../lib/collapsible";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  children?: Pick<MenuItem, "id" | "title" | "url">[];
}

export function MySidebar({ menuItems }: { menuItems: MenuItem[] }) {
  const [selectedMenu, setSelectedMenu] = useState<number>();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const _selectedMenu = window.localStorage.getItem(
      "compareLoanSelectedMenuId",
    );

    if (_selectedMenu) {
      setSelectedMenu(Number(_selectedMenu));
    } else {
      setSelectedMenu(1);
    }
  }, [window]);

  useEffect(() => {
    if (typeof window === "undefined" || !selectedMenu) {
      return;
    }

    window.localStorage.setItem(
      "compareLoanSelectedMenuId",
      selectedMenu.toString(),
    );
  }, [selectedMenu]);

  return (
    <Sidebar className="top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))]">
      <ScrollArea>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {selectedMenu ? (
                  menuItems.map((item) => {
                    if (!item.children?.length) {
                      return (
                        <NormalItem
                          key={item.title}
                          menuItem={item}
                          selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}
                        />
                      );
                    }
                    return (
                      <ParentItem
                        key={item.title}
                        menuItem={item}
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                      />
                    );
                  })
                ) : (
                  <div>
                    <Loader2 className="size-10 animate-spin items-center" />
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}

export const NormalItem = ({
  menuItem,
  selectedMenu,
  setSelectedMenu,
}: {
  menuItem: MenuItem | Pick<MenuItem, "id" | "title" | "url">;
  selectedMenu: number | undefined;
  setSelectedMenu: Dispatch<SetStateAction<number | undefined>>;
}) => {
  return (
    <SidebarMenuItem key={menuItem.title}>
      <SidebarMenuButton
        asChild
        className={cn(
          "py-7",
          menuItem.id === selectedMenu &&
            "border border-app bg-app/50 hover:bg-app/50",
        )}
      >
        <Link href={menuItem.url} onClick={() => setSelectedMenu(menuItem.id)}>
          {"icon" in menuItem && menuItem.icon && <menuItem.icon />}
          <span className="!whitespace-break-spaces">{menuItem.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const ParentItem = ({
  menuItem,
  selectedMenu,
  setSelectedMenu,
}: {
  menuItem: MenuItem;
  selectedMenu: number | undefined;
  setSelectedMenu: Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [isOpen, setIsOpen] = useState(
    !!menuItem.children?.find((item) => {
      if (!selectedMenu) {
        return false;
      }
      return item.id === selectedMenu;
    }),
  );

  console.log({
    isOpen,
  });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full cursor-pointer"
    >
      <SidebarMenuItem key={menuItem.title} className="">
        <CollapsibleTrigger
          className="mb-1 [&[data-state=open]>svg:nth-child(3)]:rotate-180"
          asChild
        >
          <SidebarMenuButton asChild className="py-7">
            <template>
              <menuItem.icon />
              <span>{menuItem.title}</span>
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </template>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="w-full overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {menuItem.children?.map((child, index) => {
            return (
              <SidebarMenuButton
                asChild
                key={index}
                className={cn(
                  "py-6",
                  child.id === selectedMenu &&
                    "border border-app bg-app/50 hover:bg-app/50",
                )}
              >
                <Link
                  href={child.url}
                  onClick={() => setSelectedMenu(child.id)}
                >
                  <span className="!whitespace-break-spaces">
                    • {"  "} {child.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
