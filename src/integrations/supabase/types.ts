export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      onboarding_responses: {
        Row: {
          business_goals: string | null
          competitors: string | null
          created_at: string | null
          geographical_focus: string | null
          id: string
          product_description: string | null
          product_name: string | null
          target_audience: string | null
          unique_value: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_goals?: string | null
          competitors?: string | null
          created_at?: string | null
          geographical_focus?: string | null
          id?: string
          product_description?: string | null
          product_name?: string | null
          target_audience?: string | null
          unique_value?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_goals?: string | null
          competitors?: string | null
          created_at?: string | null
          geographical_focus?: string | null
          id?: string
          product_description?: string | null
          product_name?: string | null
          target_audience?: string | null
          unique_value?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          onboarding_status:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      startup_evaluations: {
        Row: {
          business_model: string | null
          competition_strategy: string | null
          created_at: string | null
          current_traction: string | null
          funding_needs: string | null
          id: string
          key_metrics: string | null
          main_challenges: string | null
          problem_description: string | null
          status:
            | Database["public"]["Enums"]["startup_evaluation_status"]
            | null
          target_customer: string | null
          team_description: string | null
          updated_at: string | null
          user_id: string
          value_proposition: string | null
        }
        Insert: {
          business_model?: string | null
          competition_strategy?: string | null
          created_at?: string | null
          current_traction?: string | null
          funding_needs?: string | null
          id?: string
          key_metrics?: string | null
          main_challenges?: string | null
          problem_description?: string | null
          status?:
            | Database["public"]["Enums"]["startup_evaluation_status"]
            | null
          target_customer?: string | null
          team_description?: string | null
          updated_at?: string | null
          user_id: string
          value_proposition?: string | null
        }
        Update: {
          business_model?: string | null
          competition_strategy?: string | null
          created_at?: string | null
          current_traction?: string | null
          funding_needs?: string | null
          id?: string
          key_metrics?: string | null
          main_challenges?: string | null
          problem_description?: string | null
          status?:
            | Database["public"]["Enums"]["startup_evaluation_status"]
            | null
          target_customer?: string | null
          team_description?: string | null
          updated_at?: string | null
          user_id?: string
          value_proposition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "startup_evaluations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      onboarding_status: "not_started" | "in_progress" | "completed"
      startup_evaluation_status: "not_started" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
