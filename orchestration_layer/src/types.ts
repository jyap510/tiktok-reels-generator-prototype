export type RunStatus = 'pending' | 'running' | 'success' | 'partial' | 'error';

export type StepEntry = { status: string; duration_s: number };

export type Persona = {
  id: number;
  handle: string;
  name: string | null;
  niche: string | null;
  description: string | null;
  gender: string | null;
  avatar_prompt: string | null;
  profile_pic_prompt: string | null;
  avatar_path: string | null;
  profile_pic_path: string | null;
  avatar_kie_url: string | null;
  profile_pic_kie_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Run = {
  run_id: string;
  persona_id: number;
  status: RunStatus;
  product_asin: string | null;
  product_title: string | null;
  voiceover_script: string | null;
  persona_prompt: string | null;
  scene_prompts: string[] | null;
  video_prompts: string[] | null;
  avatar_path: string | null;
  frame_paths: (string | null)[] | null;
  clip_paths: (string | null)[] | null;
  final_path_abs: string | null;
  final_path_rel: string | null;
  started_at: string | null;
  finished_at: string | null;
  step_log: Record<string, StepEntry> | null;
  error_message: string | null;
  created_at: string;
};

export type Listing = {
  id: number;
  asin: string;
  title: string | null;
  brand: string | null;
  description: string | null;
  images: string[];
  reviews: { rating?: number; comment?: string }[];
  json_path: string | null;
  created_at: string;
};
