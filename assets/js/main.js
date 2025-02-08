(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll(".carousel-indicators").forEach((carouselIndicator) => {
    carouselIndicator
      .closest(".carousel")
      .querySelectorAll(".carousel-item")
      .forEach((carouselItem, index) => {
        if (index === 0) {
          carouselIndicator.innerHTML += `<li data-bs-target="#${
            carouselIndicator.closest(".carousel").id
          }" data-bs-slide-to="${index}" class="active"></li>`;
        } else {
          carouselIndicator.innerHTML += `<li data-bs-target="#${
            carouselIndicator.closest(".carousel").id
          }" data-bs-slide-to="${index}"></li>`;
        }
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Login and Signup Modals
   */
  function openLoginModal() {
    alert("Open Login Modal");
    // Implement your modal logic here
  }

  function openSignupModal() {
    alert("Open Signup Modal");
    // Implement your modal logic here
  }

  document.querySelectorAll(".dropdown ul a").forEach((link) => {
    if (link.innerText.includes("Login")) {
      link.addEventListener("click", openLoginModal);
    }
    if (link.innerText.includes("Sign Up")) {
      link.addEventListener("click", openSignupModal);
    }
  });
/**
 * Utility Function to Shorten Wallet Address
 */
function shortenAddress(address) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`; // First 4 and last 4 characters
}

/**
 * On Page Load: Check if wallet address is stored
 */
window.addEventListener("DOMContentLoaded", () => {
  const storedAddress = localStorage.getItem("walletAddress");

  if (storedAddress) {
    // Display the shortened wallet address if stored
    document.querySelector("#wallet-address").textContent = shortenAddress(storedAddress);

    // Set logged-in state
    isLoggedIn = true;

    // Enable the Mode dropdown
    modeDropdown.classList.remove("disabled-link");
    modeOptions.classList.remove("disabled");

    console.log("Wallet Address Restored:", storedAddress);
  }
});

  /**
   * MetaMask Login
   */
  const metamaskButton = document.querySelector("#metamask-login");
  if (metamaskButton) {
    metamaskButton.addEventListener("click", async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const walletAddress = accounts[0];

          // Display the wallet address
          document.querySelector("#wallet-address").textContent = walletAddress;

          console.log("Wallet Connected:", walletAddress);
        } catch (error) {
          console.error("User rejected the request:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install it to use this feature.");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Open Login Modal
    document.querySelectorAll('[onclick="openLoginModal()"]').forEach((button) => {
      button.addEventListener("click", () => {
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
      });
    });
  
    // Open Signup Modal
    document.querySelectorAll('[onclick="openSignupModal()"]').forEach((button) => {
      button.addEventListener("click", () => {
        const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
        signupModal.show();
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const buyerMode = document.getElementById("buyer-mode");
    const sellerMode = document.getElementById("seller-mode");
  
    function setActiveMode(mode) {
      // Remove the active class from both options
      buyerMode.classList.remove("active-mode");
      sellerMode.classList.remove("active-mode");
  
      // Add the active class to the selected mode
      if (mode === "buyer") {
        buyerMode.classList.add("active-mode");
      } else if (mode === "seller") {
        sellerMode.classList.add("active-mode");
      }
    }
  
    // Handle mode switching
    buyerMode.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      setActiveMode("buyer");
      // Add additional logic for buyer mode here
      console.log("Buyer mode selected");
    });
  
    sellerMode.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      setActiveMode("seller");
      // Add additional logic for seller mode here
      console.log("Seller mode selected");
    });
  
    // Set a default mode on page load (optional)
    setActiveMode("buyer");
  });


  document.addEventListener("DOMContentLoaded", function () {
    const properties = JSON.parse(localStorage.getItem("sellerProperties")) || [];
  
    function renderProperties() {
      const propertiesList = document.getElementById("properties-list");
      propertiesList.innerHTML = "";
  
      if (properties.length === 0) {
        propertiesList.innerHTML = "<p>No properties found. Add a new property above.</p>";
        return;
      }
  
      properties.forEach((property, index) => {
        const propertyCard = document.createElement("div");
        propertyCard.className = "card mb-3";
        propertyCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${property.title}</h5>
            <p class="card-text">${property.description}</p>
            <p><strong>Price:</strong> $${property.price}</p>
            <button class="btn btn-primary btn-sm" onclick="editProperty(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProperty(${index})">Delete</button>
          </div>
        `;
        propertiesList.appendChild(propertyCard);
      });
    }
  
    function addProperty(e) {
      e.preventDefault();
      const title = document.getElementById("property-title").value;
      const price = document.getElementById("property-price").value;
      const description = document.getElementById("property-description").value;
  
      properties.push({ title, price, description });
      localStorage.setItem("sellerProperties", JSON.stringify(properties));
      renderProperties();
      document.getElementById("add-property-form").reset();
    }
  
    function deleteProperty(index) {
      properties.splice(index, 1);
      localStorage.setItem("sellerProperties", JSON.stringify(properties));
      renderProperties();
    }
  
    document.getElementById("add-property-form").addEventListener("submit", addProperty);
  
    renderProperties();
  });

  document.addEventListener("DOMContentLoaded", function () {
    let currentMode = "buyer"; // Default mode
  
    // Handle mode switching
    document.getElementById("buyer-mode").addEventListener("click", () => {
      currentMode = "buyer";
      updateTileLinks();
    });
  
    document.getElementById("seller-mode").addEventListener("click", () => {
      currentMode = "seller";
      updateTileLinks();
    });
  
    // Function to update tile links based on mode
    function updateTileLinks() {
      const propertyTiles = document.querySelectorAll(".property-tile-link");
      propertyTiles.forEach(tile => {
        if (currentMode === "buyer") {
          tile.setAttribute("href", "property-single.html");
        } else if (currentMode === "seller") {
          tile.setAttribute("href", "manage-properties.html");
        }
      });
    }
  
    // Initial update based on default mode
    updateTileLinks();
  });


  document.addEventListener("DOMContentLoaded", function () {
    let currentMode = "buyer"; // Default mode
  
    // Function to update button actions based on mode
    function updateButtons() {
      const buttonContainers = document.querySelectorAll(".dynamic-buttons");
      buttonContainers.forEach(container => {
        container.innerHTML = ""; // Clear existing buttons
  
        if (currentMode === "buyer") {
          const buyButton = document.createElement("button");
          buyButton.className = "btn btn-success mt-2";
          buyButton.textContent = "Buy Now";
          buyButton.onclick = function () {
            window.location.href = "property-single.html"; // Redirect for buyers
          };
          container.appendChild(buyButton);
        } else if (currentMode === "seller") {
          const addButton = document.createElement("button");
          addButton.className = "btn btn-primary mt-2";
          addButton.textContent = "Add Property";
          addButton.onclick = function () {
            window.location.href = "manage-properties.html"; // Redirect for sellers
          };
          container.appendChild(addButton);
        }
      });
    }
  
    // Event listeners for mode switching
    document.getElementById("buyer-mode").addEventListener("click", (e) => {
      e.preventDefault();
      currentMode = "buyer";
      updateButtons();
    });
  
    document.getElementById("seller-mode").addEventListener("click", (e) => {
      e.preventDefault();
      currentMode = "seller";
      updateButtons();
    });
  
    // Initial update
    updateButtons();
  });
  
  // Wait for the document to load
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.ethereum !== 'undefined') {
      console.log("MetaMask is installed!");
      
      // Connect MetaMask to Ganache
      const web3 = new Web3(window.ethereum);

      try {
          // Request access to accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          console.log("Connected account:", accounts[0]);

          // Set the contract
          const contractAddress = "0x00fb5124bd34519c20dd749a38b277073fc604c5";
          const abi = [    {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "propertyId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "renter",
                "type": "address"
              }
            ],
            "name": "PropertyRented",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "nextPropertyId",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "properties",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "pricePerDay",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isAvailable",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "rentedProperties",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "userRoles",
            "outputs": [
              {
                "internalType": "enum PropertyRental.UserRole",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "registerAsOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "registerAsRenter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "pricePerDay",
                "type": "uint256"
              }
            ],
            "name": "addProperty",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "propertyId",
                "type": "uint256"
              }
            ],
            "name": "rentProperty",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "propertyId",
                "type": "uint256"
              }
            ],
            "name": "returnProperty",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }];
          const contract = new web3.eth.Contract(abi, contractAddress);

          console.log("Contract initialized:", contract);
      } catch (error) {
          console.error("Error connecting to MetaMask:", error);
      }
  } else {
      console.log("MetaMask not found! Please install it.");
  }
});
document.addEventListener("DOMContentLoaded", initializeWeb3);

// Register as a Property Owner

async function registerAsOwner() {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.registerAsOwner().send({ from: accounts[0] });
      alert("Successfully registered as Owner!");
    } catch (error) {
      console.error("Error registering as Owner:", error);
    }
  }
}

// Register as a Renter
async function registerAsRenter() {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.registerAsRenter().send({ from: accounts[0] });
      alert("Successfully registered as Renter!");
    } catch (error) {
      console.error("Error registering as Renter:", error);
    }
  }
}

async function addProperty(name, price) {
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];

  try {
    await contract.methods.addProperty(name, web3.utils.toWei(price, "ether")).send({ from: owner });
    alert("Property added successfully!");
  } catch (error) {
    console.error("Error adding property:", error);
  }
}

async function addPropertyToBlockchain() {
  const title = document.getElementById("property-title").value;
  const price = document.getElementById("property-price").value; // In ETH

  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .addProperty(title, web3.utils.toWei(price, "ether"))
        .send({ from: accounts[0] });

      alert("Property added successfully!");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  }
}


async function fetchProperties() {
  const propertyCount = await contract.methods.nextPropertyId().call();
  const propertiesContainer = document.getElementById("properties-list");
  propertiesContainer.innerHTML = ""; // Clear the list

  for (let i = 0; i < propertyCount; i++) {
    const property = await contract.methods.properties(i).call();
    if (property.isAvailable) {
      propertiesContainer.innerHTML += `
        <div class="card">
          <h5>${property.name}</h5>
          <p>Price: ${web3.utils.fromWei(property.pricePerDay, "ether")} ETH</p>
          <button onclick="rentProperty(${property.id})" class="btn btn-success">Rent</button>
        </div>
      `;
    }
  }
}



async function rentProperty(propertyId) {
  const accounts = await web3.eth.getAccounts();
  const renter = accounts[0];

  try {
    const property = await contract.methods.properties(propertyId).call();
    await contract.methods.rentProperty(propertyId).send({ from: renter, value: property.pricePerDay });
    alert("Property rented successfully!");
  } catch (error) {
    console.error("Error renting property:", error);
  }
}

async function buyProperty(propertyId, priceInEth) {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);

    // Replace with your deployed contract address and ABI
    const contractAddress = "0x00fb5124bd34519c20dd749a38b277073fc604c5"; 
    const abi = [ /* Your contract's ABI here */ ];
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const accounts = await web3.eth.getAccounts(); // Get the connected wallet accounts
      const buyer = accounts[0];

      // Convert the price from ETH to Wei (the smallest unit of ETH)
      const priceInWei = web3.utils.toWei(priceInEth, "ether");

      // Call the contract's rentProperty function
      await contract.methods.rentProperty(propertyId).send({
        from: buyer,
        value: priceInWei, // Payment in Wei
      });

      alert(`Property with ID ${propertyId} purchased successfully for ${priceInEth} ETH!`);
    } catch (error) {
      console.error("Error buying property:", error);
      alert("Failed to purchase the property. Please try again.");
    }
  } else {
    alert("MetaMask is not installed. Please install it to proceed.");
  }
}



async function loadPropertyDetails(propertyId) {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const property = await contract.methods.properties(propertyId).call();
      document.getElementById("property-title").textContent = property.name;
      document.getElementById("property-price").textContent = `${web3.utils.fromWei(property.pricePerDay, "ether")} ETH`;
      document.getElementById("property-description").textContent = property.description;
    } catch (error) {
      console.error("Error loading property details:", error);
    }
  }
}

async function returnProperty(propertyId) {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const accounts = await web3.eth.getAccounts();

      await contract.methods.returnProperty(propertyId).send({ from: accounts[0] });
      alert("Property returned successfully!");
      fetchProperties(); // Refresh the property list
    } catch (error) {
      console.error("Error returning property:", error);
    }
  }
}


  

  

  
  
  
})();
