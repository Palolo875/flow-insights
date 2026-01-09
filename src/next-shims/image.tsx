import * as React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
};

export default function Image({ fill: _fill, ...props }: Props) {
  return <img {...props} />;
}
