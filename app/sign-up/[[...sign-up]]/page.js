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
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/login" passHref>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/signup" passHref>
              Sign Up
            </Link>
          </Button>
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
