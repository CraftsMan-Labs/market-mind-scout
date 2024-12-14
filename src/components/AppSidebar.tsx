import { FileText, BarChart, PieChart, TrendingUp, Users, Database, Home, MessageSquare, ClipboardCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    label: "Navigation",
    items: [
      {
        title: "Home",
        icon: Home,
        path: "/dashboard"
      },
      {
        title: "Customer Onboarding",
        icon: ClipboardCheck,
        path: "/customer-onboarding"
      }
    ]
  },
  {
    label: "Market Insights",
    items: [
      {
        title: "Market Intelligence",
        icon: BarChart,
        path: "/market-intelligence"
      },
      {
        title: "Competitor Mapping",
        icon: TrendingUp,
        path: "/competitor-mapping"
      },
      {
        title: "Strategic Insights",
        icon: PieChart,
        path: "/strategic-insights"
      },
      {
        title: "Chat Assistant",
        icon: MessageSquare,
        path: "/chat-assistant"
      },
    ]
  },
  {
    label: "Audience Analysis",
    items: [
      {
        title: "Audience Insights",
        icon: Users,
        path: "/audience-insights"
      },
      {
        title: "Data Analytics",
        icon: Database,
        path: "/data-analytics"
      },
      {
        title: "Custom Report",
        icon: FileText,
        path: "/custom-report"
      }
    ]
  }
]

export function AppSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar className="border-r border-gray-800 bg-black">
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-gray-400">{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className="hover:bg-gray-800"
                    >
                      <item.icon className="text-gray-400" />
                      <span className="text-gray-300">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}