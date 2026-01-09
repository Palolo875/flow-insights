import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = Omit<React.ComponentProps<typeof RouterLink>, "to"> & {
  href: string;
  prefetch?: boolean;
};

export default function Link({ href, prefetch: _prefetch, ...props }: Props) {
  return <RouterLink to={href} {...props} />;
}
