// Gear animation and typing functionality
export function initGearAnimation() {
  const gear1 = document.querySelector(".terminal>img:nth-child(1)");
  const gear2 = document.querySelector(".terminal>img:nth-child(2)");
  const gear3 = document.querySelector(".terminal>img:nth-child(3)");
  const gears = document.querySelectorAll(".terminal>img");
  const terminal = document.querySelector(".terminal");
  
  if (!terminal || gears.length === 0) return;
  
  // Add transition styles to gears for smooth rotation
  gears.forEach(elem => {
    (elem as HTMLElement).style.transition = 'transform 0.3s ease';
  });
  
  const sentence1 = `I develop data intensive applications`;
  const sentence2 = `I develop agentic ai systems.`;
  const sentence3 = `I develop frontend web applications.`;
  const sentenceWithPrintStatement1 = `fmt.Println("${sentence1}")`;
  const sentenceWithPrintStatement2 = `print("${sentence2}")`;
  const sentenceWithPrintStatement3 = `console.log("${sentence3}")`;
  
  let active = {
    value: false,
    currentSentence: 0,
    gear1rot: 90,
    gear2rot: -40,
    gear3rot: -70,
    isPaused: false,
    autoLoopTimer: null as ReturnType<typeof setTimeout> | null,
    typingTimer: null as ReturnType<typeof setTimeout> | null, // Track typing timeout
    loopCount: 0 // Track how many times we've completed the full cycle
  };
  
  const arrOfSentences = [sentence1, sentence2, sentence3];
  const printStatements = [sentenceWithPrintStatement1, sentenceWithPrintStatement2, sentenceWithPrintStatement3];
  
  const typeOut = () => {
    // Don't start if already typing (to prevent double starts)
    if (active.value) return;
    
    // Don't start if paused
    if (active.isPaused) return;
    
    active.value = true;
    
    // Rotate gears
    if (gear1 && gear2 && gear3) {
      (gear1 as HTMLElement).style.transform = `rotate(${active.gear1rot.toString()}deg)`;
      (gear2 as HTMLElement).style.transform = `rotate(${active.gear2rot.toString()}deg)`;
      (gear3 as HTMLElement).style.transform = `rotate(${active.gear3rot.toString()}deg)`;
    }
    
    // Update rotation values for next time
    active.gear1rot = active.gear1rot + 90;
    active.gear2rot = active.gear2rot - 90;
    active.gear3rot = active.gear3rot - 90;
    
    const sentence = arrOfSentences[active.currentSentence];
    
    // Set transition duration based on sentence length
    gears.forEach(elem => {
      const time = sentence.length * 200;
      (elem as HTMLElement).style.transitionDuration = time.toString() + "ms";
    });
    
    const sentenceArr = [...sentence];
    let activeSentence = "";
    
    // Remove existing console.log paragraph if it exists
    const existingP = terminal.querySelector('p');
    if (existingP) existingP.remove();
    
    const elem = document.createElement("p");
    terminal.appendChild(elem);
    
    const elem1 = document.querySelector(".i-develop") as HTMLElement;
    
    // Clear the text to start typing from empty
    if (elem1) {
      elem1.innerText = '';
    }
    elem.innerText = printStatements[active.currentSentence];
    
    const recursivePrinting = (activeSentence: string) => {
      if (active.isPaused) {
        active.typingTimer = null;
        return; // Stop if paused
      }
      
      if (activeSentence.length >= sentence.length) {
        active.value = false;
        active.typingTimer = null;
        
        // Check if we've completed sentence1 (index 0) for the second time
        if (active.currentSentence === 0) {
          active.loopCount++;
          // Stop after completing sentence1 the second time (loopCount === 2)
          if (active.loopCount >= 2) {
            return; // Stop looping
          }
        }
        
        // Move to next sentence, loop back to 0 after sentence 3
        active.currentSentence = (active.currentSentence + 1) % arrOfSentences.length;
        
        // Schedule next animation if not paused
        if (!active.isPaused) {
          active.autoLoopTimer = setTimeout(() => {
            typeOut();
          }, 2000); // Wait 2 seconds before next sentence
        }
        return;
      }
      
      // Clear any existing timer
      if (active.typingTimer) {
        clearTimeout(active.typingTimer);
      }
      
      active.typingTimer = setTimeout(() => {
        if (active.isPaused) {
          active.typingTimer = null;
          return; // Check pause status
        }
        const newSentence = activeSentence.concat(sentenceArr[activeSentence.length]);
        if (elem1) {
          elem1.innerText = newSentence;
        }
        recursivePrinting(newSentence);
      }, 100);
    };
    recursivePrinting(activeSentence);
  };
  
  const pauseAnimation = () => {
    // Pause typing animation
    active.isPaused = true;
    
    // Clear any pending auto-loop timer
    if (active.autoLoopTimer) {
      clearTimeout(active.autoLoopTimer);
      active.autoLoopTimer = null;
    }
    
    // Clear any pending typing timer
    if (active.typingTimer) {
      clearTimeout(active.typingTimer);
      active.typingTimer = null;
    }
    
    // Stop gear rotation immediately by removing transition
    // This freezes the gears in their current position
    gears.forEach(elem => {
      const gear = elem as HTMLElement;
      gear.style.transition = 'none';
      // Get current computed transform to freeze at current position
      const currentTransform = window.getComputedStyle(gear).transform;
      if (currentTransform && currentTransform !== 'none') {
        gear.style.transform = currentTransform;
      }
    });
  };
  
  const resumeAnimation = () => {
    if (active.isPaused) {
      // Unpause typing animation
      active.isPaused = false;
      
      // Restore gear transitions for smooth rotation
      gears.forEach(elem => {
        (elem as HTMLElement).style.transition = 'transform 0.3s ease';
      });
      
      // If we were in the middle of typing, continue from where we left off
      if (active.value) {
        // Get the current sentence to continue typing
        const sentence = arrOfSentences[active.currentSentence];
        const elem1 = document.querySelector(".i-develop") as HTMLElement;
        
        if (elem1) {
          // Get current text to determine where we left off
          const currentText = elem1.innerText || '';
          const sentenceArr = [...sentence];
          
          // Set transition duration based on remaining characters
          const remainingChars = sentence.length - currentText.length;
          gears.forEach(elem => {
            const time = remainingChars * 200;
            (elem as HTMLElement).style.transitionDuration = time.toString() + "ms";
          });
          
          // Resume gear rotation by applying the next rotation
          // Force a reflow to ensure transition is restored, then apply new rotation
          if (gear1 && gear2 && gear3) {
            // Force reflow by reading offsetHeight to ensure transition is applied
            void (gear1 as HTMLElement).offsetHeight;
            
            // Apply the next rotation to make them actually move
            (gear1 as HTMLElement).style.transform = `rotate(${active.gear1rot.toString()}deg)`;
            (gear2 as HTMLElement).style.transform = `rotate(${active.gear2rot.toString()}deg)`;
            (gear3 as HTMLElement).style.transform = `rotate(${active.gear3rot.toString()}deg)`;
            
            // Update rotation values for next rotation
            active.gear1rot = active.gear1rot + 90;
            active.gear2rot = active.gear2rot - 90;
            active.gear3rot = active.gear3rot - 90;
          }
          
          // Continue typing from where we left off
          const continueTyping = (currentLength: number) => {
            if (active.isPaused) {
              active.typingTimer = null;
              return;
            }
            
            if (currentLength >= sentence.length) {
              active.value = false;
              active.typingTimer = null;
              
              // Check if we've completed sentence1 (index 0) for the second time
              if (active.currentSentence === 0) {
                active.loopCount++;
                // Stop after completing sentence1 the second time (loopCount === 2)
                if (active.loopCount >= 2) {
                  return; // Stop looping
                }
              }
              
              active.currentSentence = (active.currentSentence + 1) % arrOfSentences.length;
              if (!active.isPaused) {
                active.autoLoopTimer = setTimeout(() => {
                  typeOut();
                }, 2000);
              }
              return;
            }
            
            // Clear any existing timer
            if (active.typingTimer) {
              clearTimeout(active.typingTimer);
            }
            
            active.typingTimer = setTimeout(() => {
              if (active.isPaused) {
                active.typingTimer = null;
                return;
              }
              const newLength = currentLength + 1;
              const newText = sentenceArr.slice(0, newLength).join('');
              
              if (elem1) {
                elem1.innerText = newText;
              }
              
              continueTyping(newLength);
            }, 100);
          };
          
          continueTyping(currentText.length);
        }
      } else {
        // We weren't typing, so start a new animation
        active.value = false;
        typeOut();
      }
    }
  };
  
  // Add hover event listeners to gears - pause on hover
  gears.forEach(elem => {
    elem.addEventListener('mouseenter', pauseAnimation);
    elem.addEventListener('mouseleave', resumeAnimation);
  });
  
  // Also add hover to terminal container
  terminal.addEventListener('mouseenter', pauseAnimation);
  terminal.addEventListener('mouseleave', resumeAnimation);
  
  // Clear initial text and auto-start on page load if terminal is visible
  const elem1 = document.querySelector(".i-develop") as HTMLElement;
  if (elem1) {
    elem1.innerText = '';
  }
  
  if ((terminal as HTMLElement).style.display !== "none") {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      typeOut();
    }, 100);
  }
}

// Initialize all animations
export function initAnimations() {
  console.log("Init animations");
  initGearAnimation();
}


