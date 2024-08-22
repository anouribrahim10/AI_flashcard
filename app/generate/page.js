"use client";
import Image from "next/image";

import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  CardActionArea,
  DialogContentText,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AppBar from "@mui/material/AppBar";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from "@/firebase.js"; // Named import

import {
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
import logo2 from "./logo2.png";


export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists.");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
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
      <Container
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          margin: 0,
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",

          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",

        }}
      >
        {/*<Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Toolbar>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#006466" }}>
              FaithCards
            </Typography>
           </Link> 
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

        {/*<Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mt: 2 }}
          ></TextField>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            fullWidth
          >
            Generate
          </Button>
        </Paper>
      </Box>*/}
        <Box
          sx={{
            minHeight: "100vh",
            minWidth: "100vw",
            margin: 0,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",

            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
          }}
        >
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
          {/*<AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                style={{ flexGrow: 1, color: "#e5e5e5" }}
              >
                FaithCards
              </Typography>
            </Link>
            <SignedOut>
              <Button color="inherit" href="/sign-in" sx={{ color: "#006466" }}>
                Login
              </Button>
              <Button color="inherit" href="/sign-up" sx={{ color: "#006466" }}>
                Sign up
              </Button>
            </SignedOut>
          </Toolbar>
        </AppBar>*/}

          <Container maxWidth="md" sx={{ margin: 0, padding: 0 }}>
            <Box
              sx={{
                mt: 4,
                mb: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#e5e5e5", // Adjust text color for visibility
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: "#144552" }}>
                Generate Flashcards
              </Typography>
              <Paper sx={{ p: 4, width: "100%", backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)", }}>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  label="Enter text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#144552', // Border color when the field is not focused
                      },
                      '&:hover fieldset': {
                        borderColor: '#144552', // Border color when the field is hovered
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#144552', // Border color when the field is focused
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#000000', // Label color
                    },
                    '& .MuiInputBase-input': {
                      color: '#000000', // Input text color
                    },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "#144552" }}
                >
                  Generate
                </Button>
              </Paper>
            </Box>

            {flashcards.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Flashcards Preview</Typography>
                <Grid container spacing={3}>
  {flashcards.map((flashcard, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          backgroundColor: "#144552", // Set flashcard background color
          padding: 0, // Remove padding from the Card
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)", // Scale the card on hover
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // Add shadow on hover
          },
        }}
      >
        <CardActionArea onClick={() => handleCardClick(index)}>
          <CardContent
            sx={{
              textAlign: "center",
              padding: 0, // Remove padding from the CardContent
            }}
          >
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
                  transform: flipped[index]
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                },
                "& > div > div": {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  overflow: "hidden", // Ensure text doesn't overflow
                  backgroundColor: "#144552", // Set flashcard sides background color
                  padding: 0, // Remove padding from the inner div
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
                      fontSize:
                        flashcard.front.length > 50
                          ? "1rem"
                          : "1.5rem", // Adjust font size based on text length
                      padding: 0, // Remove padding from Typography
                      color: "#ffffff", // Set text color for better contrast
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
                      fontSize:
                        flashcard.back.length > 50
                          ? "1rem"
                          : "1.5rem", // Adjust font size based on text length
                      padding: 0, // Remove padding from Typography
                      color: "#ffffff", // Set text color for better contrast
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



                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    color="secondary"
                    sx={{ backgroundColor: "#144552" }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}

<Dialog open={open} onClose={handleClose}
  PaperProps={{
    sx: {
      backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
    },
  }}
>
  <DialogTitle>Save Flashcards</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please enter a name for your flashcard collection.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label="Collection Name"
      type="text"
      fullWidth
      value={name}
      onChange={(e) => setName(e.target.value)}
      variant="outlined"
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleClose}
      sx={{
        backgroundColor: "#144552",
        color: "#ffffff", // Optional: change text color for better contrast
        "&:hover": {
          backgroundColor: "#0d3b4f", // Optional: darken on hover
        },
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleSave}
      sx={{
        backgroundColor: "#144552",
        color: "#ffffff", // Optional: change text color for better contrast
        "&:hover": {
          backgroundColor: "#0d3b4f", // Optional: darken on hover
        },
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

          </Container>
        </Box>
      </Container>
    </>
  );
}
