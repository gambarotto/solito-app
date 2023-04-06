export type UserProps = {
  id: string;
  email: string;
  name: string;
}
export type SessionUser = {
  user: UserProps;
  token: string;
}
export type SignUpProps = {
  name: string;
  email: string;
  password: string;
}
export type SignInProps = {
  email: string;
  password: string;
}
export type TaskProps = {
  id: string;
  content: string;
  done: boolean,
  userId: string,
}
export type NewTaskProps = {
  content: string;
}