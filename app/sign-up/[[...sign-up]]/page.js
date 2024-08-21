"use client";
import Image from "next/image";
import { SignedIn, SignedOut, SignUp, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
      }}
    >
      <Head>
        <title>Sign Up - FaithCards</title>
        <meta name="description" content="Sign up page for FaithCards" />
      </Head>

      <Container maxWidth="sm" sx={{ margin: 0, padding: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Typography variant="h6" style={{ color: "#006466" }}>
        FaithCards
      </Typography>
    </Link>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <SignedOut>
        <Button color="inherit" href="/sign-in" sx={{ color: "#006466" }}>
          Login
        </Button>
        <Button color="inherit" href="/sign-up" sx={{ color: "#006466" }}>
          Sign up
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </Toolbar>
</AppBar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            // Removed the background and padding to allow the gradient to show through
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: "#e5e5e5" }}>
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Container>
    </Box>
  );
}
