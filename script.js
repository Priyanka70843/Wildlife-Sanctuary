// Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    // Set minimum date to today
    const todayInput = document.getElementById('visitDate');
    const today = new Date().toISOString().split('T')[0];
    todayInput.setAttribute('min', today);
    
    // Form Submission Handler
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear all previous error messages
        clearAllErrors();
        
        // Validate all fields
        if (validateForm()) {
            submitForm();
        }
    });
});

// Validation Functions
function validateForm() {
    let isValid = true;
    
    // Validate Full Name
    isValid = validateName() && isValid;
    
    // Validate Email
    isValid = validateEmail() && isValid;
    
    // Validate Phone
    isValid = validatePhone() && isValid;
    
    // Validate Sanctuary Selection
    isValid = validateSanctuary() && isValid;
    
    // Validate Purpose
    isValid = validatePurpose() && isValid;
    
    // Validate Visit Date
    isValid = validateDate() && isValid;
    
    // Validate Duration
    isValid = validateDuration() && isValid;
    
    // Validate Number of People
    isValid = validatePeople() && isValid;
    
    // Validate Age Group
    isValid = validateAgeGroup() && isValid;
    
    // Validate Terms
    isValid = validateTerms() && isValid;
    
    return isValid;
}

function validateName() {
    const fullName = document.getElementById('fullName').value.trim();
    const nameError = document.getElementById('nameError');
    
    if (!fullName) {
        showError('nameError', 'Full name is required');
        return false;
    }
    
    if (fullName.length < 3) {
        showError('nameError', 'Name must be at least 3 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        showError('nameError', 'Name should contain only letters and spaces');
        return false;
    }
    
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('emailError', 'Email is required');
        return false;
    }
    
    if (!emailPattern.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^[0-9]{10}$/;
    
    if (!phone) {
        showError('phoneError', 'Phone number is required');
        return false;
    }
    
    if (!phonePattern.test(phone)) {
        showError('phoneError', 'Phone number must be 10 digits');
        return false;
    }
    
    return true;
}

function validateSanctuary() {
    const sanctuary = document.getElementById('sanctuary').value;
    
    if (!sanctuary) {
        showError('sanctuaryError', 'Please select a wildlife sanctuary');
        return false;
    }
    
    return true;
}

function validatePurpose() {
    const checkboxes = document.querySelectorAll('input[name="purpose"]:checked');
    
    if (checkboxes.length === 0) {
        showError('purposeError', 'Please select at least one purpose of visit');
        return false;
    }
    
    return true;
}

function validateDate() {
    const visitDate = document.getElementById('visitDate').value;
    const dateError = document.getElementById('dateError');
    
    if (!visitDate) {
        showError('dateError', 'Visit date is required');
        return false;
    }
    
    const selectedDate = new Date(visitDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError('dateError', 'Visit date cannot be in the past');
        return false;
    }
    
    return true;
}

function validateDuration() {
    const duration = parseInt(document.getElementById('duration').value);
    const durationError = document.getElementById('durationError');
    
    if (!duration || duration < 1) {
        showError('durationError', 'Duration must be at least 1 day');
        return false;
    }
    
    if (duration > 30) {
        showError('durationError', 'Duration cannot exceed 30 days');
        return false;
    }
    
    return true;
}

function validatePeople() {
    const numberOfPeople = parseInt(document.getElementById('numberOfPeople').value);
    const peopleError = document.getElementById('peopleError');
    
    if (!numberOfPeople || numberOfPeople < 1) {
        showError('peopleError', 'At least 1 visitor is required');
        return false;
    }
    
    if (numberOfPeople > 50) {
        showError('peopleError', 'Maximum 50 visitors allowed per registration');
        return false;
    }
    
    return true;
}

function validateAgeGroup() {
    const ageGroup = document.getElementById('ageGroup').value;
    
    if (!ageGroup) {
        showError('ageError', 'Please select an age group');
        return false;
    }
    
    return true;
}

function validateTerms() {
    const terms = document.getElementById('terms').checked;
    
    if (!terms) {
        showError('termsError', 'You must agree to the terms and conditions');
        return false;
    }
    
    return true;
}

// Utility Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

// Number Input Control Functions
function increaseNumber() {
    const input = document.getElementById('numberOfPeople');
    let value = parseInt(input.value) || 1;
    if (value < 50) {
        input.value = value + 1;
    }
}

function decreaseNumber() {
    const input = document.getElementById('numberOfPeople');
    let value = parseInt(input.value) || 1;
    if (value > 1) {
        input.value = value - 1;
    }
}

// Form Submission
function submitForm() {
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        sanctuary: document.getElementById('sanctuary').value,
        purpose: Array.from(document.querySelectorAll('input[name="purpose"]:checked'))
                    .map(cb => cb.value)
                    .join(', '),
        visitDate: document.getElementById('visitDate').value,
        duration: document.getElementById('duration').value,
        numberOfPeople: document.getElementById('numberOfPeople').value,
        ageGroup: document.getElementById('ageGroup').value,
        specialRequirements: document.getElementById('specialRequirements').value.trim()
    };
    
    // Get sanctuary name
    const sanctuarySelect = document.getElementById('sanctuary');
    const sanctuaryName = sanctuarySelect.options[sanctuarySelect.selectedIndex].text;
    
    // Format the date
    const dateObj = new Date(formData.visitDate);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Format purpose
    const purposeMap = {
        'wildlife_photography': 'Wildlife Photography',
        'bird_watching': 'Bird Watching',
        'nature_study': 'Nature Study',
        'research': 'Research',
        'tourism': 'General Tourism',
        'adventure': 'Adventure/Trekking'
    };
    
    const formattedPurpose = Array.from(document.querySelectorAll('input[name="purpose"]:checked'))
                                .map(cb => purposeMap[cb.value])
                                .join(', ');
    
    // Format age group
    const ageGroupMap = {
        'children': 'Children (Below 12)',
        'teenagers': 'Teenagers (13-19)',
        'adults': 'Adults (20-60)',
        'seniors': 'Seniors (Above 60)',
        'mixed': 'Mixed Age Group'
    };
    
    // Display success message with details
    displaySuccessMessage(formData, sanctuaryName, formattedDate, formattedPurpose, ageGroupMap);
    
    // Log the data (in real scenario, this would be sent to server)
    console.log('Registration Data:', formData);
    
    // Store in localStorage for demonstration
    storeRegistration(formData);
}

function displaySuccessMessage(data, sanctuaryName, formattedDate, formattedPurpose, ageGroupMap) {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const successDetails = document.getElementById('successDetails');
    
    // Hide form, show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Prepare success message content
    const detailsHTML = `
        <strong>✓ Registration Confirmation</strong><br><br>
        <table style="width: 100%; text-align: left; border-collapse: collapse; margin: 1rem 0;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Visitor Name:</strong></td>
                <td style="padding: 0.5rem;">${data.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Email:</strong></td>
                <td style="padding: 0.5rem;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Phone:</strong></td>
                <td style="padding: 0.5rem;">+91 ${data.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Sanctuary:</strong></td>
                <td style="padding: 0.5rem;">${sanctuaryName}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Visit Purpose:</strong></td>
                <td style="padding: 0.5rem;">${formattedPurpose}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Visit Date:</strong></td>
                <td style="padding: 0.5rem;">${formattedDate}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Duration:</strong></td>
                <td style="padding: 0.5rem;">${data.duration} days</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Number of Visitors:</strong></td>
                <td style="padding: 0.5rem;">${data.numberOfPeople} people</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.3);">
                <td style="padding: 0.5rem;"><strong>Age Group:</strong></td>
                <td style="padding: 0.5rem;">${ageGroupMap[data.ageGroup]}</td>
            </tr>
        </table>
        <p style="margin-top: 1rem; font-size: 0.95rem;">
            A confirmation email has been sent to <strong>${data.email}</strong>.<br>
            Please carry your confirmation number when visiting the sanctuary.
        </p>
    `;
    
    successDetails.innerHTML = detailsHTML;
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Reset form
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Reset number input
    document.getElementById('numberOfPeople').value = 1;
    
    // Clear all errors
    clearAllErrors();
    
    // Scroll to top of form
    form.scrollIntoView({ behavior: 'smooth' });
}

function storeRegistration(data) {
    // Get existing registrations from localStorage
    let registrations = JSON.parse(localStorage.getItem('wildlifeRegistrations')) || [];
    
    // Add timestamp
    data.registrationTime = new Date().toLocaleString('en-IN');
    data.registrationId = 'WLS' + Date.now();
    
    // Add new registration
    registrations.push(data);
    
    // Store back to localStorage
    localStorage.setItem('wildlifeRegistrations', JSON.stringify(registrations));
    
    console.log('Registration stored successfully!');
    console.log('Registration ID:', data.registrationId);
}

// Additional utility: View all registrations (for admin purposes)
function viewAllRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('wildlifeRegistrations')) || [];
    console.table(registrations);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form field real-time validation
document.getElementById('fullName')?.addEventListener('blur', validateName);
document.getElementById('email')?.addEventListener('blur', validateEmail);
document.getElementById('phone')?.addEventListener('blur', validatePhone);
document.getElementById('sanctuary')?.addEventListener('change', validateSanctuary);
document.getElementById('visitDate')?.addEventListener('change', validateDate);
document.getElementById('duration')?.addEventListener('change', validateDuration);
document.getElementById('numberOfPeople')?.addEventListener('change', validatePeople);
document.getElementById('ageGroup')?.addEventListener('change', validateAgeGroup);

// Number input manual entry validation
document.getElementById('numberOfPeople')?.addEventListener('input', function() {
    let value = parseInt(this.value) || 1;
    if (value < 1) this.value = 1;
    if (value > 50) this.value = 50;
});

document.getElementById('duration')?.addEventListener('input', function() {
    let value = parseInt(this.value) || 1;
    if (value < 1) this.value = 1;
    if (value > 30) this.value = 30;
});
