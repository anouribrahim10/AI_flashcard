"use client";
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
import AppBar from "@mui/material/AppBar";
import Link from 'next/link';
import Toolbar from "@mui/material/Toolbar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
      <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" style={{ flexGrow: 1, color: "#e5e5e5" }}>
              FaithCards
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

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
          <Typography variant="h4" sx={{ mb: 2 }}>
            Generate Flashcards
          </Typography>
          <Paper sx={{ p: 4, width: "100%", backgroundColor: "#f2e8cf" }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ mt: 2 }}
              InputLabelProps={{
                style: { color: "#000000" },
              }}
              InputProps={{
                style: { color: "#000000" },
              }}
            ></TextField>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#006466" }}
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
                      backgroundColor: "#f2e8cf", // Set flashcard background color
                      padding: 0, // Remove padding from the Card
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
                              backgroundColor: "#f2e8cf", // Set flashcard sides background color
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
              <Button variant="contained" onClick={handleOpen} color="secondary">
                Save
              </Button>
            </Box>
          </Box>
        )}


        <Dialog open={open} onClose={handleClose}>
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
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
