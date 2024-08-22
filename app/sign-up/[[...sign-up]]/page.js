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
import logo2 from "./logo2.png";

export default function SignUpPage() {
  return (
    <>
    <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }
      `}</style>
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
        backgroundImage: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
      }}
    >
      <Head>
        <title>Sign Up - FaithCards</title>
        <meta name="description" content="Sign up page for FaithCards" />
      </Head>

      <Container maxWidth="sm" sx={{ margin: 0, padding: 0 }}>
      <AppBar
            position="static"
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              padding: "12px 24px",
            }}
          >
            <Toolbar sx={{ minHeight: 80, justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link href="/" passHref>
                  <Image
                    src={logo2}
                    alt="FaithCards Logo"
                    width={180}
                    height={60}
                    style={{ objectFit: "contain", cursor: "pointer" }}
                  />
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SignedOut>
                  <Button
                    color="inherit"
                    href="/sign-in"
                    sx={{
                      backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
                      color: "black",
                      fontWeight: "bold",
                      mr: 2,
                      fontSize: "1rem",
                      padding: "10px 20px",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    href="/sign-up"
                    sx={{
                      backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      padding: "10px 20px",
                    }}
                  >
                    Sign up
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </Box>
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
          <Typography variant="h4" sx={{ mb: 2, color: "#144552" }}>
            Sign Up
          </Typography>
          <SignUp />
        </Box>
      </Container>
    </Box>
    </>
  );
}
