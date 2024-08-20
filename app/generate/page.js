"use client";
import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Flashcard Component
const Flashcard = ({ question, answer }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {answer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Generate(){
 const {isLoaded, isSignedIn, User} 
}