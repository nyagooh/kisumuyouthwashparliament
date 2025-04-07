import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/save-data', async (req, res) => {
    try {
        const data = req.body;
        const type = data.type.toLowerCase();
        
        if (type === 'events') {
            const filename = path.join(__dirname, '../data/events.json');
            
            await fs.mkdir(path.join(__dirname, '../data')).catch(() => {});
            
            let eventsData = { upcoming_events: [], past_events: [] };
            
            try {
                const fileContent = await fs.readFile(filename, 'utf8');
                const parsedData = JSON.parse(fileContent);
                
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
            
            const eventData = {
                id: maxId + 1,
                title: data.title,
                date: data.startDate,
                location: data.location || '',
                description: data.description,
                link: data.link,
                images: [data.imageUrl]
            };
            
            eventsData[targetArray].push(eventData);
            
            await fs.writeFile(filename, JSON.stringify(eventsData, null, 2));
            
            res.json({ success: true });
        } else {
            const filename = path.join(__dirname, `../data/${type}.json`);
            
            await fs.mkdir(path.join(__dirname, '../data')).catch(() => {});
            
            let existingData = [];
            try {
                const fileContent = await fs.readFile(filename, 'utf8');
                existingData = JSON.parse(fileContent);
            } catch (error) {
                // File doesn't exist yet, that's okay
            }
            
            existingData.push(data);
            
            await fs.writeFile(filename, JSON.stringify(existingData, null, 2));
            
            res.json({ success: true });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Serve HTML pages
app.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/about.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/admin.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/contact.html'));
});

app.get('/event', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/event.html'));
});

app.get('/impact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/impact.html'));
});

export default app; 