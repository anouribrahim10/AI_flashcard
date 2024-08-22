"use client";
import Image from "next/image";
import logo2 from "./logo2.png";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  AppBar,
  Toolbar,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      try {
        const docRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          console.log("Fetched flashcards:", collections);
          setFlashcards(collections);
        } else {
          await setDoc(docRef, { flashcards: [] });
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (name) => {
    router.push(`/flashcard?id=${name}`);
  };

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
    <Container maxWidth={false} sx={{ width: "100%" }}>
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
          <Grid container spacing={3} sx={{ mt: 4 }}>
  {flashcards.map((flashcard, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          backgroundImage: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
          color: "#ffffff", // Optional: ensure text is readable against the gradient
        }}
      >
        <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {flashcard.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))}
</Grid>

    </Container>
    </>
  );
}
