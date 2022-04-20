import React from "react";
import { Avatar, AvatarTypeMap } from "@mui/material";

export interface CenteredRoundBoxProps {
  children: Children;
}

type AvatarPropsType = AvatarTypeMap["props"];

export const CenteredRoundBox = ({
  children,
  ...props
}: CenteredRoundBoxProps & AvatarPropsType) => (
  <Avatar
    sx={{
      m: 1,
      backgroundColor: "primary.main",
    }}
    {...props}
  >
    {children}
  </Avatar>
);

export default CenteredRoundBox;
