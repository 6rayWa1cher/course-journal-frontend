import React from "react";
import { CssBaseline, Grid, Paper } from "@mui/material";
import { useDocumentTitle } from "utils/hooks";

export interface ImageWidgetPageProps {
  title: string;
  children: React.ReactNode;
}

const ImageWidgetPage = ({ title, children }: ImageWidgetPageProps) => {
  useDocumentTitle(title);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        xl={9}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        xl={3}
        component={Paper}
        elevation={6}
        square
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default ImageWidgetPage;
