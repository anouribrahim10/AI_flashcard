import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import logo from "./logo.png";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  Avatar,
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
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
        //background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="100vw">
        <Head>
          <title>FaithCards</title>
          <meta name="description" content="Create flashcards from your text" />
        </Head>

        {/*<AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" href="/sign-up">
                Sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>*/}
        {/*<Box
          sx={{
            textAlign: "center",
            my: 4,
          }}
        >
          <Typography variant="h2"> Welcome to Flashcard</Typography>
          <Typography variant="h5">
            {" "}
            The easiest way to make flashcards from text
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button variant="contained" color="secondary" href="/generate">
              Get Started
            </Button>
            <Button variant="contained" color="primary" href="/flashcards">
              Saved Flashcards
            </Button>
          </Box>
        </Box>*/}
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
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
              sx={{ mt: 2, color: "#e5e5e5" }}
            >
              Get Started
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, color: "#e5e5e5" }}
              href="/flashcards"
            >
              Saved Flashcards
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ my: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" sx={{ color: "#e5e5e5" }}>
              Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "#99d98c" }}>
                  Easy Topic Selection
                </Typography>
                <Typography sx={{ color: "#e5e5e5" }}>
                  Simply input the Islamic topic you wish to learn about, and
                  let our AI generate flashcards with questions for you to
                  study.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "#99d98c" }}>
                  Smart Flashcards
                </Typography>
                <Typography sx={{ color: "#e5e5e5" }}>
                  Our AI creates relevant and insightful questions based on your
                  selected topic. Just click the flashcard to reveal the answer
                  and enhance your knowledge.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "#99d98c" }}>
                  Accessible Anywhere
                </Typography>
                <Typography sx={{ color: "#e5e5e5" }}>
                  Study Islamic topics on the go. Our platform is available
                  wherever you have an internet connection.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ color: "#e5e5e5" }}
              >
                The Developers
              </Typography>
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
        </Grid>
      </Container>
    </Box>
  );
}
