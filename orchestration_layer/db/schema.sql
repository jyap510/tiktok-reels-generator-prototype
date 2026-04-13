CREATE TABLE IF NOT EXISTS personas (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  handle              TEXT UNIQUE NOT NULL,
  name                TEXT,
  niche               TEXT,
  description         TEXT,
  gender              TEXT,
  avatar_prompt       TEXT,
  profile_pic_prompt  TEXT,
  avatar_path         TEXT,
  profile_pic_path    TEXT,
  avatar_kie_url      TEXT,
  profile_pic_kie_url TEXT,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS runs (
  run_id           TEXT PRIMARY KEY,
  persona_id       INTEGER REFERENCES personas(id),
  status           TEXT NOT NULL DEFAULT 'pending',
  product_asin     TEXT,
  product_title    TEXT,
  voiceover_script TEXT,
  persona_prompt   TEXT,
  scene_prompts    TEXT,
  video_prompts    TEXT,
  avatar_path      TEXT,
  frame_paths      TEXT,
  clip_paths       TEXT,
  final_path_abs   TEXT,
  final_path_rel   TEXT,
  started_at       TIMESTAMP,
  finished_at      TIMESTAMP,
  step_log         TEXT,
  error_message    TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listings (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  asin        TEXT UNIQUE NOT NULL,
  title       TEXT,
  brand       TEXT,
  description TEXT,
  images      TEXT,
  reviews     TEXT,
  json_path   TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generations (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id        TEXT REFERENCES runs(run_id),
  type          TEXT,
  status        TEXT DEFAULT 'pending',
  input_json    TEXT,
  output_json   TEXT,
  error_message TEXT,
  started_at    TIMESTAMP,
  finished_at   TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS prompt_drafts (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  persona_id         INTEGER REFERENCES personas(id),
  listing_id         INTEGER REFERENCES listings(id),
  voiceover_script   TEXT,
  persona_prompt     TEXT,
  profile_pic_prompt TEXT,
  scene_prompts      TEXT,
  video_prompts      TEXT,
  direction          TEXT,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kie_tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id     TEXT UNIQUE,
  type        TEXT,
  status      TEXT DEFAULT 'pending',
  persona_id  INTEGER,
  run_id      TEXT,
  output_url  TEXT,
  output_path TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS upload_logs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id        TEXT REFERENCES runs(run_id),
  platform      TEXT DEFAULT 'tiktok',
  status        TEXT DEFAULT 'pending',
  caption       TEXT,
  uploaded_at   TIMESTAMP,
  error_message TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
