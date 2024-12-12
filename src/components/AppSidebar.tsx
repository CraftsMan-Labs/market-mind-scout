import { FileText, BarChart, PieChart, TrendingUp, MessageSquare } from "lucide-react"
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

const reportTypes = [
  {
    title: "Market Analysis",
    icon: BarChart,
    prompt: "Generate a comprehensive market analysis report"
  },
  {
    title: "Competitor Research",
    icon: TrendingUp,
    prompt: "Create a detailed competitor research report"
  },
  {
    title: "Demographics Study",
    icon: PieChart,
    prompt: "Analyze demographic trends and create a report"
  },
  {
    title: "Custom Report",
    icon: FileText,
    prompt: "What type of report would you like to generate?"
  },
]

export function AppSidebar({ onReportSelect }: { onReportSelect: (prompt: string) => void }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Report Generation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportTypes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onReportSelect(item.prompt)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}