import express from "express";
import { getTopCentralTopics } from "./analytics/centrality";
import { getHubTopics } from "./analytics/hubs";
import { getGraph } from "./analytics/graph";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Analytics API running");
});

// Top central topics
app.get("/api/centrality",async(_req,res)=>{
    const data = await getTopCentralTopics(10);
    res.json(data);
});

// Hub topics
app.get("/api/hubs",async(_req,res)=>{
    const data = await getHubTopics(10);
    res.json(data);
});

// Graph data
app.get("/api/graph",async(_req,res)=>{
    const data = await getGraph(300);
    res.json(data);
});

app.listen(PORT,()=>{
    console.log(`Analytics API running at http://localhost:${PORT}`);
});