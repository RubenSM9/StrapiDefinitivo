'use client';

import { Button, Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Verificación de MUI en Next.js
      </Typography>
      <Button variant="contained" color="primary" onClick={() => alert("¡MUI está funcionando!")}>
  ¡MUI Funciona!
</Button>
    </Container>
  );
}
