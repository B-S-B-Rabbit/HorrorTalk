declare global {
  interface ApiConfig {
    proxyUrl: string;
    proxyPort: string;
    tbdbApiKey: string;
    tmdbUrl: string;
    tmdbApiVer: string;
  }
  interface User {
    login: string;
    email: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    password: string;
  }
  interface GuestSessionToken {
    guest_session_id: string;
    expires_at: string;
    success: boolean;
  }
}

export {};
