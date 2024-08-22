"use client";

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import logo from "./logo.png";
import logo2 from "./logo2.png";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import MosqueIcon from '@mui/icons-material/Mosque';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import Head from "next/head";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Home() {
  const teamMembers = [
    {
      name: "Anour Ibrahim",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGUkNmhO2QS5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723670039082?e=1729728000&v=beta&t=0DhOZ_CIMrPh-yABoKnJMZNnp7i7-MXpeeaqaoA2GiQ",
      linkedin: "https://www.linkedin.com/in/anour-ibrahim-b11573234/",
    },
    {
      name: "Shafin Rehman",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQFDekch2jc2dg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724123528171?e=1729728000&v=beta&t=2fuv2TbUl26KpyKhWVT_E5gfqazBDRHcw3RQPyv8mfM",
      linkedin: "https://www.linkedin.com/in/shafin-rehman/",
    },
    {
      name: "Rabigh Ahmed",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQFhTJRkgEolmw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724123744309?e=1729728000&v=beta&t=ytV01QHw_iA36INQMasLqF5fVl2qCpcdIVPyHBTWrls",
      linkedin: "https://www.linkedin.com/in/rabigh-ahmed-24a413263/",
    },
    {
      name: "Mohammad Kabir",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQG446Sy-ORoYQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724109361103?e=1729728000&v=beta&t=8dS9KAINTiyxafOOik5b8s8Ej8jR2dvaPiDrSYbWm8w",
      linkedin: "https://www.linkedin.com/in/mohammad-kabir-196a5020a//",
    },
  ];

  return (
    <>
      {/* Ensure there's no margin or padding in the root elements */}
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
          <title>FaithCards</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: "12px 24px"  // Increase padding to make the AppBar larger
          }}
        >
          <Toolbar sx={{ minHeight: 80 }}> {/* Increase the height of the Toolbar */}
            <Box sx={{ flexGrow: 1 }}>
              <Link href="/" passHref>
                <Image
                  src={logo2}
                  alt="FaithCards Logo"
                  width={180}  // Increase the logo width
                  height={60}  // Increase the logo height
                  style={{ objectFit: "contain", cursor: "pointer" }}
                />
              </Link>
            </Box>
            <SignedOut>
              <Button
                color="inherit"
                href="/sign-in"
                sx={{
                  backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
                  color: "black",
                  fontWeight: "bold",
                  mr: 2,
                  fontSize: "1rem",  // Increase button text size
                  padding: "10px 20px"  // Increase button padding
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
                  fontSize: "1rem",  // Increase button text size
                  padding: "10px 20px"  // Increase button padding
                }}
              >
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
            textAlign: "center",
            my: 4,
          }}
        >
          <Image
            src={logo}
            alt="FaithCards Logo"
            width={300}
            height={150}
            style={{ margin: "0 auto" }}
          />
          <Typography variant="h2" sx={{ color: "#144552" }}>
            Let's Learn Islam Together
          </Typography>
          <Typography variant="h5" sx={{ color: "#e5e5e5" }}>
            Explore and deepen your understanding of Islamic topics with ease.
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              href="/generate"
              sx={{
                mt: 2,
                color: "#e5e5e5",
                backgroundColor: "#144552",
                fontWeight: "bold"
              }}
            >
              Get Started
            </Button>

            <Button
              variant="contained"
              color="primary"
              href="/flashcards"
              sx={{
                mt: 2,
                color: "#e5e5e5",
                backgroundColor: "#144552",
                fontWeight: "bold"
              }}
            >
              Saved Flashcards
            </Button>

          </Box>
        </Box>

        <Grid container spacing={4} sx={{ my: 6, p: 4, justifyContent: "center" }}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#144552",
                color: "#e5e5e5",
                border: '2px solid transparent',
                position: "relative",
                '&:hover': {
                  transform: 'scale(1.05)',
                  border: '4px solid #000000',
                },
                transition: 'transform 0.2s, border 0.2s',
                textAlign: "center",
                padding: "16px"
              }}
            >
              <MosqueIcon
                sx={{
                  fontSize: 64,
                  color: "#d9d9d9",
                  marginBottom: "16px"
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#f77f00" }}>
                  Easy Topic Selection
                </Typography>
                <Typography>
                  Simply input the Islamic topic you wish to learn about, and let our AI generate flashcards with questions for you to study.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#144552",
                color: "#e5e5e5",
                border: '2px solid transparent',
                position: "relative",
                '&:hover': {
                  transform: 'scale(1.05)',
                  border: '4px solid #000000',
                },
                transition: 'transform 0.2s, border 0.2s',
                textAlign: "center",
                padding: "16px"
              }}
            >
              <SmartButtonIcon
                sx={{
                  fontSize: 64,
                  color: "#d9d9d9",
                  marginBottom: "16px"
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#f77f00" }}>
                  Smart Flashcards
                </Typography>
                <Typography>
                  Our AI creates relevant and insightful questions based on your selected topic. Just click the flashcard to reveal the answer and enhance your knowledge.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#144552",
                color: "#e5e5e5",
                border: '2px solid transparent',
                position: "relative",
                '&:hover': {
                  transform: 'scale(1.05)',
                  border: '4px solid #000000',
                },
                transition: 'transform 0.2s, border 0.2s',
                textAlign: "center",
                padding: "16px"
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: 64,
                  color: "#d9d9d9",
                  marginBottom: "16px"
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#f77f00" }}>
                  Accessible Anywhere
                </Typography>
                <Typography>
                  Study Islamic topics on the go. Our platform is available wherever you have an internet connection.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ color: "#144552", textAlign: "center", my: 4 }}>
            Meet Our Team
          </Typography>

          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              
              <Stack direction="row" spacing={4} mt={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                  <Link
                    href={member.linkedin}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ textDecoration: "none", color: "#e5e5e5" }}
                  >
                    <Avatar
                      alt={member.name}
                      src={member.image}
                      sx={{
                        width: 80,
                        height: 80,
                        border: "2px solid #006466",
                      }}
                    />
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Box>

        <footer
          style={{
            textAlign: "center",
            padding: "16px",
            marginTop: "auto",
            backgroundColor: "#144552",
            color: "#e5e5e5",
            width: "100%",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" sx={{ color: "#e5e5e5" }}>
              FaithCards - Deepen Your Knowledge of Islam, One Card at a Time.
            </Typography>
            <Typography variant="body2" sx={{ color: "#e5e5e5", marginTop: "8px" }}>
              © {new Date().getFullYear()} FaithCards. All rights reserved.
            </Typography>
          </Container>
        </footer>
      </Box>
    </>
  );
}
