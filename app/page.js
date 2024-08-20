import Image from "next/image";
import getStripe from "@/utils/get-stripe";
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
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            {/*<Button color="inherit">Login</Button>
            <Button color="inherit">Sign up</Button>*/}
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
        <Typography variant="h2"> Welcome to Flashcard</Typography>
        <Typography variant="h5">
          {" "}
          The easiest way to make flashcards from text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ my: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2">
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h6">Easy Text Input</Typography>
              <Typography>
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              The Developers
            </Typography>
            <Stack direction="row" spacing={4} mt={4} justifyContent="center">
              {teamMembers.map((member, index) => (
                <Link
                  href={member.linkedin}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: "none" }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{ width: 80, height: 80, border: "2px solid #fff" }}
                  />
                </Link>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
