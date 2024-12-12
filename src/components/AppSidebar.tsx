import { FileText, BarChart, PieChart, TrendingUp, Users, Database } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    label: "Market Insights",
    items: [
      {
        title: "Market Intelligence",
        icon: BarChart,
        prompt: "Generate a market intelligence report"
      },
      {
        title: "Competitor Mapping",
        icon: TrendingUp,
        prompt: "Create a competitor mapping analysis"
      },
      {
        title: "Strategic Insights",
        icon: PieChart,
        prompt: "Analyze strategic insights and opportunities"
      },
    ]
  },
  {
    label: "Audience Analysis",
    items: [
      {
        title: "Audience Insights",
        icon: Users,
        prompt: "Generate audience insights report"
      },
      {
        title: "Data Analytics",
        icon: Database,
        prompt: "Create a data analytics report"
      },
      {
        title: "Custom Report",
        icon: FileText,
        prompt: "What type of report would you like to generate?"
      },
    ]
  }
]

export function AppSidebar({ onReportSelect }: { onReportSelect: (prompt: string) => void }) {
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
                      onClick={() => onReportSelect(item.prompt)}
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