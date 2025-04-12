// Initialize the map
function initMap() {
    // Default center on Sarawak
    const sarawak = { lat: 2.5, lng: 113.5 };
    const map = new google.maps.Map(document.getElementById('flood-map'), {
        zoom: 8,
        center: sarawak,
        mapTypeId: 'terrain'
    });

    // Add flood risk areas (example data)
    const floodRiskAreas = [
        {
            name: 'Kuching City Center',
            coordinates: [
                { lat: 1.55, lng: 110.35 },
                { lat: 1.56, lng: 110.36 },
                { lat: 1.55, lng: 110.37 }
            ],
            riskLevel: 'high'
        },
        // Add more areas as needed
    ];

    // Add flood risk polygons
    floodRiskAreas.forEach(area => {
        const polygon = new google.maps.Polygon({
            paths: area.coordinates,
            strokeColor: area.riskLevel === 'high' ? '#FF0000' : '#FFA500',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: area.riskLevel === 'high' ? '#FF0000' : '#FFA500',
            fillOpacity: 0.35
        });

        polygon.setMap(map);

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<div><h3>${area.name}</h3><p>Risk Level: ${area.riskLevel}</p></div>`
        });

        polygon.addListener('click', () => {
            infoWindow.setPosition(area.coordinates[0]);
            infoWindow.open(map);
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const menuBtn = document.createElement('button');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
navbar.insertBefore(menuBtn, navLinks);

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Alert system
function updateAlerts() {
    // Example alert data
    const alerts = [
        {
            location: 'Kuching City Center',
            level: 'high',
            time: '2 hours ago',
            details: 'Expected flood level: 1.5m'
        },
        // Add more alerts as needed
    ];

    const alertContainer = document.querySelector('.alert-container');
    alertContainer.innerHTML = '';

    alerts.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.className = 'alert-card';
        alertCard.innerHTML = `
            <div class="alert-header">
                <span class="alert-level ${alert.level}">${alert.level.toUpperCase()} Risk</span>
                <span class="alert-time">${alert.time}</span>
            </div>
            <h3>${alert.location}</h3>
            <p>${alert.details}</p>
            <button class="alert-btn">View Details</button>
        `;
        alertContainer.appendChild(alertCard);
    });
}

// Initialize alerts
updateAlerts();

// Simulate real-time updates (for demonstration)
setInterval(() => {
    // Update alerts every 5 minutes
    updateAlerts();
}, 300000);

// Form handling for community reports
document.querySelectorAll('.community-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.textContent.trim();
        if (action === 'Submit Report' || action === 'Request Now') {
            showModal(action);
        }
    });
});

// Modal functionality
function showModal(action) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${action}</h2>
            <form id="report-form">
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" id="location" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="photo">Upload Photo (Optional)</label>
                    <input type="file" id="photo" accept="image/*">
                </div>
                <button type="submit" class="submit-btn">Submit</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });

    // Handle form submission
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        alert('Thank you for your submission! Our team will review it shortly.');
        modal.remove();
    });
}

// Add CSS for modal
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        position: relative;
    }

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .submit-btn {
        background: var(--secondary-color);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }
`;
document.head.appendChild(style);

// Load Google Maps API
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadGoogleMaps();
}); 