import useAuthentication, { useAuthGuard } from "../utils/hooks";

type Props = { Element: any };

const AuthGuardRoute = ({ Element }: Props) => {
  const {
    /* ... */
  } = useAuthGuard();

  return <Element />;
};

export default AuthGuardRoute;
