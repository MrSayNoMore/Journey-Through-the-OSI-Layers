// ==== GAME STATE ====
const gameState = {
    currentLayer: 7,
    badges: [],
    progress: 0
  };
  
  // ==== DOM ELEMENTS ====
  const panelImage = document.getElementById('panelImage');
  const panelText = document.getElementById('panelText');
  const choicesArea = document.getElementById('choicesArea');
  const progressBar = document.getElementById('progressBar');
  const badgeCollection = document.getElementById('badgeCollection');
  
  const startBtn = document.getElementById('startBtn');
  const nextBtn = document.getElementById('nextBtn');
  const retryBtn = document.getElementById('retryBtn');
  const restartBtn = document.getElementById('restartBtn');
  const layerTitle = document.getElementById('currentLayerTitle');
  const layerDescription = document.getElementById('layerDescription');
  
  // ==== LAYER DATA ====
  const osiLayers = {
    7: {
      name: "Application Layer",
      scene: "assets/IMAGES/layer7_app.png",
      description: "Handles communication with software applications. Choose wisely!",
      challenge: [
        { text: "Use Video Streaming (High Quality)", success: false },
        { text: "Use Audio-Only Stream", success: true },
        { text: "Text Chat Mode", success: true }
      ]
    },
    6: {
      name: "Presentation Layer",
      scene: "assets/IMAGES/layer6_presentation.png",
      description: "Manages data formats, compression, encryption.",
      challenge: [
        { text: "Download Raw Uncompressed Files", success: false },
        { text: "Request Compressed Files", success: true },
        { text: "Auto-Convert Media", success: true }
      ]
    },
    5: {
      name: "Session Layer",
      scene: "assets/IMAGES/layer5_session.png",
      description: "Establishes, manages and maintains sessions.",
      challenge: [
        { text: "Manual Reconnect on Failure", success: false },
        { text: "Auto Session Reconnect", success: true },
        { text: "Checkpoint Saving", success: true }
      ]
    },
    4: {
      name: "Transport Layer",
      scene: "assets/IMAGES/layer4_transport.png",
      description: "Reliable transfer of data (TCP/UDP).",
      challenge: [
        { text: "UDP for All Data", success: false },
        { text: "TCP for Files, UDP for Calls", success: true },
        { text: "TCP Only for Everything", success: false }
      ]
    },
    3: {
      name: "Network Layer",
      scene: "assets/IMAGES/layer3_network.png",
      description: "Handles routing and packet forwarding.",
      challenge: [
        { text: "Static Routing Only", success: false },
        { text: "Dynamic Routing", success: true },
        { text: "Connect to Nearby CDN", success: true }
      ]
    },
    2: {
      name: "Data Link Layer",
      scene: "assets/IMAGES/layer2_datalink.png",
      description: "Frame transmission between devices.",
      challenge: [
        { text: "No Error Checking", success: false },
        { text: "Error Detection Enabled", success: true },
        { text: "Adaptive Error Correction", success: true }
      ]
    },
    1: {
      name: "Physical Layer",
      scene: "assets/IMAGES/layer1_physical.png",
      description: "Transmission of raw bits via media.",
      challenge: [
        { text: "Stay Indoors on Weak Signal", success: false },
        { text: "Find a Stronger Signal Outside", success: true },
        { text: "Use Poor Wi-Fi", success: false }
      ]
    }
  };
  
  // ==== EVENT LISTENERS ====
  startBtn.addEventListener('click', startGame);
  nextBtn.addEventListener('click', moveToNextLayer);
  retryBtn.addEventListener('click', retryLayer);
  restartBtn.addEventListener('click', restartGame);
  
  // ==== START THE GAME ====
  function startGame() {
    startBtn.style.display = 'none';
    loadLayer(gameState.currentLayer);
  }
  
  // ==== LOAD CURRENT LAYER ====
  function loadLayer(layerNumber) {
    const layer = osiLayers[layerNumber];
    
    if (!layer) {
      endGame();
      return;
    }
  
    // Update UI
    panelImage.src = layer.scene;
    panelText.innerText = `Layer ${layerNumber}: ${layer.name}`;
    layerTitle.innerText = layer.name;
    layerDescription.innerText = layer.description;
  
    choicesArea.innerHTML = '';
    layer.challenge.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.classList.add('choice-btn');
      btn.innerHTML = choice.text;
      btn.onclick = () => evaluateChoice(choice.success);
      choicesArea.appendChild(btn);
    });
  
    nextBtn.style.display = 'none';
    retryBtn.style.display = 'none';
  }
  
  // ==== EVALUATE USER CHOICE ====
  function evaluateChoice(success) {
    choicesArea.innerHTML = '';
  
    if (success) {
      panelText.innerHTML = `<i class="fas fa-check-circle"></i> Mission Success!`;
      earnBadge(gameState.currentLayer);
      nextBtn.style.display = 'inline-block';
    } else {
      panelText.innerHTML = `<i class="fas fa-times-circle"></i> Uh-oh! Network Error! Fix it!`;
      triggerNetworkGlitch();
      retryBtn.style.display = 'inline-block';
    }
  
    updateProgress();
  }
  
  // ==== TRIGGER NETWORK GLITCH ====
  function triggerNetworkGlitch() {
    const glitches = [
      "Packet Loss Detected!",
      "High Latency Warning!",
      "Routing Error: Lost in the Cloud!",
      "Data Corruption Occurred!"
    ];
    const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
    layerDescription.innerHTML = `<span style="color: var(--danger-color);">${randomGlitch}</span>`;
  }
  
  // ==== MOVE TO NEXT LAYER ====
  function moveToNextLayer() {
    gameState.currentLayer -= 1;
    if (gameState.currentLayer === 0) {
      endGame();
    } else {
      loadLayer(gameState.currentLayer);
    }
  }
  
  // ==== RETRY CURRENT LAYER ====
  function retryLayer() {
    loadLayer(gameState.currentLayer);
  }
  
  // ==== RESTART ENTIRE GAME ====
  function restartGame() {
    gameState.currentLayer = 7;
    gameState.badges = [];
    gameState.progress = 0;
    badgeCollection.innerHTML = '';
    startGame();
  }
  
  // ==== EARN A BADGE ====
  function earnBadge(layerNumber) {
    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.innerHTML = `🏅 Layer ${layerNumber} Mastered!`;
    badgeCollection.appendChild(badge);
    gameState.badges.push(layerNumber);
  }
  
  // ==== UPDATE PROGRESS BAR ====
  function updateProgress() {
    const totalLayers = 7;
    const completed = gameState.badges.length;
    gameState.progress = (completed / totalLayers) * 100;
    progressBar.style.width = `${gameState.progress}%`;
  }
  
  // ==== END GAME ====
  function endGame() {
    panelImage.src = "assets/IMAGES/scene_end.png";
    panelText.innerHTML = `🎉 Congratulations! You mastered the OSI Quest!`;
    choicesArea.innerHTML = '';
    nextBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    layerTitle.innerText = "Quest Complete!";
    layerDescription.innerText = "You've helped Neo build a solid network connection!";
  }
  









  














