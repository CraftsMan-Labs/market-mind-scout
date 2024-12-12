import { ChatUI } from "@/components/ChatUI";

export default function ChatAssistant() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Chat Assistant</h2>
      <p className="text-muted-foreground">
        Get real-time assistance and insights about your market
      </p>
      <ChatUI initialPrompt="How can I help you understand your market better today?" />
    </div>
  );
}