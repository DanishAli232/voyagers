import useAuthentication from "../utils/hooks";

type Props = { Element: any };

const ProtectedRoute = ({ Element }: Props) => {
  const {
    /* ... */
  } = useAuthentication();

  return <Element />;
};

export default ProtectedRoute;
