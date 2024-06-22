export async function useCheckUser() {
  try {
    const token = useGetToken();

    if (!token) {
      return false;
    }
    const expiresAt = new Date(token.expires_at);
    const now = new Date();

    if (now < expiresAt) {
      useUserSet(useGetUser() as User);
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
}
