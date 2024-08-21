"use client";
import Image from "next/image";
import { SignedIn, SignedOut, SignUp, UserButton } from "@clerk/nextjs";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Stack,
} from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import { SignIn } from "@clerk/clerk-react";
export default function SignUpPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#006466" }}>
              FaithCards
            </Typography>
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
          </Toolbar>
        </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          //height: "100vh",
        }}
      >
        <Typography variant="h4">Sign Up</Typography>
        <SignUp />
      </Box>
    </Container>
  );
}
