import express from "express";
import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/save-data", async (req, res) => {
  try {
    const data = req.body;

    // Check if body is empty
    if (!data) {
      return res.status(400).json({ error: "No data provided" });
    }

    const type = data.type.toLowerCase();

    if (type === "events") {
      const filename = path.join(__dirname, "../data/events.json");

      await fs.mkdir(path.join(__dirname, "../data")).catch(() => {});

      let eventsData = { upcoming_events: [], past_events: [] };

      try {
        const fileContent = await fs.readFile(filename, "utf8");
        const parsedData = JSON.parse(fileContent);

        if (
          parsedData &&
          parsedData.upcoming_events &&
          parsedData.past_events
        ) {
          eventsData = parsedData;
        }
      } catch (error) {
        // File doesn't exist or has invalid format, use default empty structure
      }

      // Determine which array to use based on the event type selection
      const eventType = data.eventType || "upcoming"; // Default to upcoming if not specified
      const targetArray =
        eventType === "upcoming" ? "upcoming_events" : "past_events";

      // Generate a unique ID
      const maxId =
        eventsData[targetArray].length > 0
          ? Math.max(...eventsData[targetArray].map((event) => event.id))
          : 0;

      const eventData = {
        id: maxId + 1,
        title: data.title,
        date: data.startDate,
        location: data.location || "",
        description: data.description,
        link: data.link,
        images: [data.imageUrl],
      };

      eventsData[targetArray].push(eventData);

      await fs.writeFile(filename, JSON.stringify(eventsData, null, 2));

      res.json({ success: true });

    } else if (type === "impact") {
      const filename = "data/impact.json";

      await fs.mkdir("data").catch(() => {});

      const imagesFolder = "public/images/kiwasko";
      await fs.mkdir(imagesFolder, { recursive: true });

      const savedImages = [];
      for (const image of data.images) {
        const imagePath = path.join(imagesFolder, path.basename(image));

        // Decode base64 image data before saving
        const base64Data = image.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 prefix
        const buffer = Buffer.from(base64Data, "base64"); // Convert to binary data

        await fs.writeFile(imagePath, buffer); // Save the decoded image
        savedImages.push(`kiwasko/${path.basename(image)}`);
      }

      let impactData = { impact_stories: [] };

      try {
        const fileContent = await fs.readFile(filename, "utf8");
        const parsedData = JSON.parse(fileContent);

        if (parsedData && parsedData.impact_stories) {
          impactData = parsedData;
        }
      } catch (error) {
        // File doesn't exist or has invalid format, use default empty structure
      }

      const maxId =
        impactData.impact_stories.length > 0
          ? Math.max(...impactData.impact_stories.map((story) => story.id))
          : 0;

      const impactStory = {
        id: maxId + 1,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        images: savedImages,
        tag: data.tag,
        layout: data.layout,
      };

      impactData.impact_stories.push(impactStory);

      await fs.writeFile(filename, JSON.stringify(impactData, null, 2));

      res.json({ success: true });
    } else {
      const filename = path.join(__dirname, `../data/${type}.json`);

      await fs.mkdir(path.join(__dirname, "../data")).catch(() => {});

      let existingData = [];
      try {
        const fileContent = await fs.readFile(filename, "utf8");
        existingData = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist yet, that's okay
      }

      existingData.push(data);

      await fs.writeFile(filename, JSON.stringify(existingData, null, 2));

      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Serve HTML pages
app.get(["/", "/index"], (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/about.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/admin.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/contact.html"));
});

app.get("/event", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/event.html"));
});

app.get("/impact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/impact.html"));
});

// Endpoint to fetch impact stories
app.get("/api/impact-stories", async (req, res) => {
  try {
    const impactStoriesPath = path.join(__dirname, "../data/impact.json");
    console.log("dirname: ", __dirname);

    // Check if file exists
    try {
      await fs.access(impactStoriesPath);
    } catch (error) {
      console.error("Impact stories file not found");
      return res.status(404).json({ error: "Impact stories file not found" });
    }

    // Read and parse the file
    const fileContent = await fs.readFile(impactStoriesPath, "utf8");
    const impactStories = JSON.parse(fileContent);

    // Validate the data structure
    if (!impactStories || !Array.isArray(impactStories.impact_stories)) {
      console.error("Invalid impact stories data structure");
      return res
        .status(500)
        .json({ error: "Invalid impact stories data structure" });
    }

    res.json(impactStories);
  } catch (error) {
    console.error("Error reading impact stories:", error);
    res.status(500).json({ error: "Failed to read impact stories" });
  }
});

// Endpoint to fetch gallery data
app.get("/api/gallery-data", async (req, res) => {
  try {
    const galleryDataPath = path.join(
      __dirname,
      "../public/data/gallery-data.json"
    );

    // Check if file exists
    try {
      await fs.access(galleryDataPath);
    } catch (error) {
      console.error("Gallery data file not found");
      return res.status(404).json({ error: "Gallery data file not found" });
    }

    // Read and parse the file
    const fileContent = await fs.readFile(galleryDataPath, "utf8");
    const galleryData = JSON.parse(fileContent);

    // Validate the data structure
    if (!galleryData || !Array.isArray(galleryData.galleryItems)) {
      console.error("Invalid gallery data structure");
      return res.status(500).json({ error: "Invalid gallery data structure" });
    }

    res.json(galleryData);
  } catch (error) {
    console.error("Error reading gallery data:", error);
    res.status(500).json({ error: "Failed to read gallery data" });
  }
});

export default app;
