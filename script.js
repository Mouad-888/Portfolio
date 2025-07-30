// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

document.addEventListener('click', () => {
    cursor.classList.add('cursor-click');
    setTimeout(() => {
        cursor.classList.remove('cursor-click');
    }, 200);
    
    // Create spark effect
    const spark = document.createElement('div');
    spark.style.position = 'absolute';
    spark.style.width = '10px';
    spark.style.height = '10px';
    spark.style.backgroundColor = '#ffd700';
    spark.style.borderRadius = '50%';
    spark.style.left = cursor.style.left;
    spark.style.top = cursor.style.top;
    spark.style.boxShadow = '0 0 15px #ffd700';
    spark.style.animation = 'fadeOut 0.5s forwards';
    document.body.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 500);
});

// Fetch data from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Load certifications
        const certsContainer = document.getElementById('certs-container');
        data.certifications.forEach(cert => {
            const certElement = document.createElement('div');
            certElement.className = 'cert-item';
            certElement.innerHTML = `
                <h3>${cert.title}</h3>
                <p>${cert.year} ${cert.institution ? '| ' + cert.institution : ''}</p>
            `;
            certsContainer.appendChild(certElement);
        });

        // Load skills
        const skillsContainer = document.getElementById('skills-container');
        data.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill';
            skillElement.innerHTML = `
                <p>${skill.name}</p>
                <div class="skill-meter">
                    <div class="skill-level" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillElement);
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// Animate sections when scrolling
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});