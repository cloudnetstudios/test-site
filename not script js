document.addEventListener('DOMContentLoaded', function() {
    // Log IP address when the page loads
    logVisitor();
    
    // Add event listeners to download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.getAttribute('data-file');
            logDownload(fileName);
            simulateDownload(fileName);
        });
    });
    
    // Add event listeners to locked project cards
    const lockedProjects = document.querySelectorAll('.project-card.locked');
    lockedProjects.forEach(project => {
        project.addEventListener('click', function() {
            alert('This project is currently locked. Check back later for access!');
        });
    });
});

// Function to log visitor IP address
async function logVisitor() {
    try {
        // Get IP information
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Get additional information about the visitor
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const screenSize = `${window.screen.width}x${window.screen.height}`;
        const referrer = document.referrer || 'Direct';
        
        // Send to Discord webhook
        const webhookUrl = 'https://discord.com/api/webhooks/1400530692885970976/yb_356OR91Lyc5nx-MZe7N97aApPC5TsR8qWPj3cpo11lw9PEMUFEOydtqgQg3-3OT32';
        
        const message = {
            content: '**New Visitor**',
            embeds: [{
                title: 'Visitor Information',
                color: 5814783, // Green color
                fields: [
                    {
                        name: 'IP Address',
                        value: ipData.ip,
                        inline: true
                    },
                    {
                        name: 'User Agent',
                        value: userAgent
                    },
                    {
                        name: 'Language',
                        value: language,
                        inline: true
                    },
                    {
                        name: 'Screen Size',
                        value: screenSize,
                        inline: true
                    },
                    {
                        name: 'Referrer',
                        value: referrer,
                        inline: true
                    },
                    {
                        name: 'Time',
                        value: new Date().toLocaleString(),
                        inline: true
                    }
                ],
                footer: {
                    text: 'Gorilla Tag Copy Help'
                }
            }]
        };
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
    } catch (error) {
        console.error('Error logging visitor:', error);
    }
}

// Function to log download activity
async function logDownload(fileName) {
    try {
        // Get IP information
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // Send to Discord webhook
        const webhookUrl = 'https://discord.com/api/webhooks/1400530692885970976/yb_356OR91Lyc5nx-MZe7N97aApPC5TsR8qWPj3cpo11lw9PEMUFEOydtqgQg3-3OT32';
        
        const message = {
            content: '**Download Activity**',
            embeds: [{
                title: 'Download Information',
                color: 16750848, // Orange color
                fields: [
                    {
                        name: 'File Downloaded',
                        value: fileName,
                        inline: true
                    },
                    {
                        name: 'IP Address',
                        value: ipData.ip,
                        inline: true
                    },
                    {
                        name: 'Time',
                        value: new Date().toLocaleString(),
                        inline: true
                    }
                ],
                footer: {
                    text: 'Gorilla Tag Copy Help'
                }
            }]
        };
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
    } catch (error) {
        console.error('Error logging download:', error);
    }
}

// Function to handle downloads
function simulateDownload(fileName) {
    // Create a download link to the actual file
    const element = document.createElement('a');
    element.setAttribute('href', 'downloads/' + fileName);
    element.setAttribute('download', fileName);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}
