export function useSetToken(item: GuestSessionToken | null) {
  if (item) {
    const token = useCookie<GuestSessionToken | null>("tmdb_guest_token", {
      expires: new Date(item.expires_at),
    });
    token.value = item ? item : null;
  }
}
export function useDeleteTokens() {
  const token = useCookie<GuestSessionToken | null>("tmdb_guest_token");
  if (token.value) {
    token.value = null;
  }
}
export function useGetToken() {
  const token = useCookie<GuestSessionToken | null>("tmdb_guest_token");
  if (token.value) {
    return token.value;
  } else {
    return "";
  }
}

export function useSetUser(item: User | null) {
  const user = useCookie<User | null>("horror_talk_user", {
    expires: new Date("01/01/2030"),
  });
  user.value = item ? item : null;
}
export function useDeleteUser() {
  const user = useCookie<User | null>("horror_talk_user");
  if (user.value) {
    user.value = null;
  }
}
export function useGetUser() {
  const user = useCookie<User | null>("horror_talk_user");
  if (user.value) {
    return user.value;
  } else {
    return "";
  }
}
