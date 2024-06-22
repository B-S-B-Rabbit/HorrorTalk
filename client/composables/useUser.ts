export async function useUserSet(user: User, update = false) {
  if (!update || !useState("user")) useState("user", () => user);
  else if (update) {
    const userState = useState<User>("user");
    userState.value = user;
  }
}
