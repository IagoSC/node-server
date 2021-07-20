import express from "express";

import { app } from "./app";

app.listen(3333);
app.use(express.json());
