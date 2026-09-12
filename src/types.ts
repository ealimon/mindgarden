export type ModuleId =
  | 'memoryLane'
  | 'familyVoices'
  | 'singAlong'
  | 'garden'
  | 'matching'
  | 'today'
  | 'coloring'
  | 'sorting'
  | 'natureSounds'
  | 'puzzle';

export interface ModuleDef {
  id: ModuleId;
  title: string;
  description: string;
  accent: 'sage' | 'gold' | 'blue' | 'terracotta';
  emoji: string;
  /** Modules that need photo/audio content or a hosting decision before they're fully live */
  needsContent: boolean;
}

export interface PhotoEntry {
  id: string;
  url: string;
  caption?: string;
  uploadedBy?: string;
}

export interface VoiceEntry {
  id: string;
  url: string;
  from: string;
  label?: string;
}
