// Gear animation and typing functionality
document.addEventListener('DOMContentLoaded', () => {
    const gear1 = document.querySelector(".terminal>img:nth-child(1)");
    const gear2 = document.querySelector(".terminal>img:nth-child(2)");
    const gear3 = document.querySelector(".terminal>img:nth-child(3)");
    const gears = document.querySelectorAll(".terminal>img");
    const terminal = document.querySelector(".terminal");
    
    if (!terminal || gears.length === 0) return;
    
    // Add transition styles to gears for smooth rotation
    gears.forEach(elem => {
        elem.style.transition = 'transform 0.3s ease';
    });
    
    const sentence1 = `I develop websites.`;
    const sentence2 = `I develop web apps.`;
    const sentence3 = `I develop software.`;
    let active = {
        value: false,
        currentSentence: 0,
        gear1rot: 90,
        gear2rot: -40,
        gear3rot: -70
    }
    const arrOfSentences = [sentence1, sentence2, sentence3];
    
    const typeOut = () => {
        if (active.value || active.currentSentence === 3) return;
        
        active.value = true;
        
        // Rotate gears
        if (gear1 && gear2 && gear3) {
            gear1.style.transform = `rotate(${active.gear1rot.toString()}deg)`;
            gear2.style.transform = `rotate(${active.gear2rot.toString()}deg)`;
            gear3.style.transform = `rotate(${active.gear3rot.toString()}deg)`;
        }
        
        // Update rotation values for next time
        active.gear1rot = active.gear1rot + 90;
        active.gear2rot = active.gear2rot - 90;
        active.gear3rot = active.gear3rot - 90;
        
        const sentence = arrOfSentences[active.currentSentence];
        
        // Set transition duration based on sentence length
        gears.forEach(elem => {
            const time = sentence.length * 200;
            elem.style.transitionDuration = time.toString() + "ms";
        });
        
        const sentenceArr = [...sentence];
        let activeSentence = "";
        
        // Remove existing console.log paragraph if it exists
        const existingP = terminal.querySelector('p');
        if (existingP) existingP.remove();
        
        const elem = document.createElement("p");
        terminal.appendChild(elem);
        
        const elem1 = document.querySelector(".i-develop");
        const elem2 = document.querySelector(".websites");
        
        if (elem1) elem1.innerText = "";
        if (elem2) elem2.innerText = "";
        elem.innerText = `console.log(${sentence});`;
        
        const recursivePrinting = (activeSentence) => {
            if (activeSentence.length > sentence.length) {
                active.value = false;
                active.currentSentence = active.currentSentence + 1;
                return;
            }
            if (activeSentence.length < 10) {
                setTimeout(() => {
                    const newSentence = activeSentence.concat(sentenceArr[activeSentence.length]);
                    if (elem1) elem1.innerText = newSentence;
                    recursivePrinting(newSentence);
                }, 100);
            }
            else {
                setTimeout(() => {
                    const newSentence = activeSentence.concat(sentenceArr[activeSentence.length]);
                    if (elem2) elem2.innerText = activeSentence.slice(10);
                    recursivePrinting(newSentence);
                }, 100);
            }
        }
        recursivePrinting(activeSentence);
    }
    
    // Add hover event listeners to gears
    gears.forEach(elem => {
        elem.addEventListener('mouseover', () => {
            typeOut();
        });
    });
    
    // Also add hover to terminal container
    terminal.addEventListener('mouseover', () => {
        typeOut();
    });
    
    // Auto-start on page load if terminal is visible
    if (terminal.style.display !== "none") {
        typeOut();
    }
});

// Portfolio modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolioData = JSON.parse(document.getElementById('portfolio-data')?.textContent || '[]');

    const hideModal = () => {
        const overlay = document.querySelector(".overlay");
        if (overlay) overlay.classList.add("hidden");
    }

    const openModal = (e) => {
        const index = parseInt(e.target.dataset.index);
        const project = portfolioData[index];
        if (!project) return;
        
        const main = document.querySelector(".main-img");
        const sec = document.querySelector(".secondary-img");
        const overlay = document.querySelector(".overlay");
        
        if (main) main.src = project.imageUrl || '';
        if (sec) {
            sec.src = project.secondaryImageUrl || '';
            if (!project.secondaryImageUrl) {
                sec.style.display = "none";
            } else {
                sec.style.display = "block";
            }
        }
        
        const list = document.querySelector(".modal>ul");
        if (list && project.description) {
            list.innerHTML = project.description;
            const listItem = document.createElement("li");
            listItem.className = "links";
            list.appendChild(listItem);
            let linksHtml = '';
            if (project.linkUrl) linksHtml += `<a href="${project.linkUrl}" target="_blank" rel="noreferrer">Site</a>`;
            if (project.repoUrl) linksHtml += `<a href="${project.repoUrl}" target="_blank" rel="noreferrer">Code</a>`;
            listItem.innerHTML = linksHtml;
        }
        
        if (overlay) {
            setTimeout(() => {
                overlay.classList.remove("hidden");
            }, 50);
        }
    }

    // Initialize portfolio modal
    document.querySelectorAll("button.portfolio-img").forEach((elem) => {
        elem.addEventListener("click", openModal);
    });
    
    const exitBtn = document.getElementById("exit-list");
    if (exitBtn) exitBtn.addEventListener("click", hideModal);
    
    const unsetBtn = document.querySelector(".unset");
    if (unsetBtn) {
        unsetBtn.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 32: {
                    event.stopPropagation();
                    return hideModal();
                }
            }
            return true;
        });
    }
    
    // Keyboard handler for focus trapping
    function keyboardHandler(e) {
        const firstFocusableEl = document.querySelector(".links>a");
        const lastFocusableEl = document.querySelector(".unset");
        if (e.keyCode === 9) {
            if (e.shiftKey && document.activeElement === firstFocusableEl) {
                e.preventDefault();
                if (lastFocusableEl) lastFocusableEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
                e.preventDefault();
                if (firstFocusableEl) firstFocusableEl.focus();
            }
        }
    }
    
    const modal = document.querySelector(".modal");
    if (modal) {
        modal.addEventListener('keydown', keyboardHandler);
    }
});

