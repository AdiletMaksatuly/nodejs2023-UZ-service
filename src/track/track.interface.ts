export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface CreateTrack {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface UpdateTrack {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
