import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static('./'));

// API endpoint to save data
app.post('/api/save-data', async (req, res) => {
    try {
        const data = req.body;
        const type = data.type.toLowerCase();
        
        // Special handling for events
        if (type === 'events') {
            const filename = 'data/events.json';
            
            // Create data directory if it doesn't exist
            await fs.mkdir('data').catch(() => {});
            
            // Initialize with empty arrays
            let eventsData = { upcoming_events: [], past_events: [] };
            
            // Try to read existing data
            try {
                const fileContent = await fs.readFile(filename, 'utf8');
                const parsedData = JSON.parse(fileContent);
                
                // Use existing data if it has the correct structure
                if (parsedData && parsedData.upcoming_events && parsedData.past_events) {
                    eventsData = parsedData;
                }
            } catch (error) {
                // File doesn't exist or has invalid format, use default empty structure
            }
            
            // Determine which array to use based on the event type selection
            const eventType = data.eventType || 'upcoming'; // Default to upcoming if not specified
            const targetArray = eventType === 'upcoming' ? 'upcoming_events' : 'past_events';
            
            // Generate a unique ID
            const maxId = eventsData[targetArray].length > 0 
                ? Math.max(...eventsData[targetArray].map(event => event.id)) 
                : 0;
            
            // Format the event data
            const eventData = {
                id: maxId + 1,
                title: data.title,
                date: data.startDate,
                location: data.location || 'Kisumu',
                description: data.description,
                link: data.link,
                images: [data.imageUrl]
            };
            
            // Add to appropriate array
            eventsData[targetArray].push(eventData);
            
            // Write back to file
            await fs.writeFile(filename, JSON.stringify(eventsData, null, 2));
            
            res.json({ success: true });
        } else {
            // Handle other types (Impact, gallery) as before
            const filename = `data/${type}.json`;
            
            // Create data directory if it doesn't exist
            await fs.mkdir('data').catch(() => {});
            
            // Read existing data
            let existingData = [];
            try {
                const fileContent = await fs.readFile(filename, 'utf8');
                existingData = JSON.parse(fileContent);
            } catch (error) {
                // File doesn't exist yet, that's okay
            }
            
            // Add new data to array
            existingData.push(data);
            
            // Write back to file
            await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
            
            res.json({ success: true });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});