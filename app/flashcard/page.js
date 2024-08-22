"use client";
import Image from "next/image";

import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import logo2 from "./logo2.png";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      // Reference the correct path in Firestore
      const colRef = collection(db, "users", user.id, search);
      const docs = await getDocs(colRef);

      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });

      console.log("Fetched flashcards:", flashcards);
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
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
          {flashcards.map((flashcard, index) => (
  <Grid item xs={12} sm={6} md={4} key={index}>
    <Card>
      <CardActionArea onClick={() => handleCardClick(index)}>
        <CardContent>
          <Box
            sx={{
              perspective: "1000px",
              "& > div": {
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                position: "relative",
                width: "100%",
                height: "200px",
                boxShadow: "0 0 4px 3px rgba(0, 0, 0, 0.2)",
                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                backgroundImage: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
                borderRadius: "4px", // Optional: smoothens the edges
              },
              "& > div > div": {
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                boxSizing: "border-box",
                overflow: "hidden",
                color: "#ffffff", // Ensure text is visible against the gradient
              },
              "& > div > div:nth-of-type(2)": {
                transform: "rotateY(180deg)",
              },
            }}
          >
            <div>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    fontSize: flashcard.front.length > 50 ? "1rem" : "1.5rem",
                  }}
                >
                  {flashcard.front}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordWrap: "break-word",
                    fontSize: flashcard.back.length > 50 ? "1rem" : "1.5rem",
                  }}
                >
                  {flashcard.back}
                </Typography>
              </div>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
))}

      </Grid>
    </Container>
  );
}
