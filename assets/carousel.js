// 1. Define your luxury slide content matching the factsheet parameters
const slidesDataEN = [
  {
    img: "./assets/interior-living.webp",
    counter: "01 / 04",
    title: "Living Spaces",
    desc: "3.1 metre ceilings · floor-to-ceiling windows · private terraces",
  },
  {
    img: "./assets/interior-kitchen.webp", // Update with your actual asset file path
    counter: "02 / 04",
    title: "Kitchen",
    desc: "Premium European appliances · custom quartz countertops · integrated cabinetry",
  },
  {
    img: "./assets/interior-bedroom.webp", // Update with your actual asset file path
    counter: "03 / 04",
    title: "Bedrooms",
    desc: "Spacious walk-in wardrobes · natural oak flooring · ambient architectural cove lighting",
  },
  {
    img: "./assets/interior-bathroom.webp", // Update with your actual asset file path
    counter: "04 / 04",
    title: "Bathrooms",
    desc: "Premium Travertine stone finishes · bespoke rainfall showers · freestanding soaking tub",
  },
];

const slidesDataRU = [
  {
    img: "../assets/interior-living.webp", // Не забудьте изменить путь для папки /ru/
    counter: "01 / 04",
    title: "Гостиные",
    desc: "Потолки 3.1 метра · панорамные окна · личные террасы",
  },
  {
    img: "../assets/interior-kitchen.webp",
    counter: "02 / 04",
    title: "Кухня",
    desc: "Премиальная европейская техника · кварцевые столешницы · встроенные шкафы",
  },
  {
    img: "../assets/interior-bedroom.webp",
    counter: "03 / 04",
    title: "Спальни",
    desc: "Просторные гардеробные · пол из натурального дуба · архитектурное освещение",
  },
  {
    img: "../assets/interior-bathroom.webp",
    counter: "04 / 04",
    title: "Ванные комнаты",
    desc: "Отделка из травертина · тропический душ · отдельно стоящая ванна",
  },
];

const isRussian = window.location.pathname.includes('/ru/');
const slidesData = isRussian ? slidesDataRU : slidesDataEN;

let activeIndex = 0;

// 2. DOM Elements Selection
const imgElement = document.getElementById("carousel-img");
const counterElement = document.getElementById("carousel-counter");
const titleElement = document.getElementById("carousel-title");
const descElement = document.getElementById("carousel-desc");
const textWrapper = document.getElementById("carousel-text-wrapper");
const tabButtons = document.querySelectorAll(".carousel-tab");

// 3. Central Update Function with Fade Transitions
function updateCarousel(nextIndex) {
  // Trigger temporary fade out for assets
  imgElement.classList.add("opacity-0");
  textWrapper.classList.add("opacity-0");

  // Wait briefly for fade-out execution, update values, then fade back in
  setTimeout(() => {
    activeIndex = nextIndex;
    const data = slidesData[activeIndex];

    // Apply new data values
    imgElement.src = data.img;
    imgElement.alt = data.title;
    counterElement.textContent = data.counter;
    titleElement.textContent = data.title;
    descElement.textContent = data.desc;

    // Toggle active layout states on bottom lines/opacities
    tabButtons.forEach((btn, idx) => {
      const line = btn.querySelector(".tab-line");
      if (idx === activeIndex) {
        btn.classList.replace("opacity-40", "opacity-100");
        btn.classList.remove("hover:opacity-70");
        line.classList.replace("bg-border", "bg-accent");
      } else {
        btn.classList.replace("opacity-100", "opacity-40");
        btn.classList.add("hover:opacity-70");
        line.classList.replace("bg-accent", "bg-border");
      }
    });

    // Fade elements back in
    imgElement.classList.remove("opacity-0");
    textWrapper.classList.remove("opacity-0");
  }, 300);
}

// 4. Register Navigation Click Actions
document.getElementById("interiors-next").addEventListener("click", () => {
  let nextIndex = (activeIndex + 1) % slidesData.length;
  updateCarousel(nextIndex);
});

document.getElementById("interiors-prev").addEventListener("click", () => {
  let prevIndex = (activeIndex - 1 + slidesData.length) % slidesData.length;
  updateCarousel(prevIndex);
});

// 5. Register Bottom Tabs Click Actions
tabButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const targetedIndex = parseInt(button.getAttribute("data-index"));
    if (targetedIndex !== activeIndex) {
      updateCarousel(targetedIndex);
    }
  });
});

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 10;

  header.classList.toggle("scrolled", scrolled);
});


document.getElementById('leadForm').addEventListener('submit', function(e) {
    const form = e.target;

    if (!form.checkValidity()) {
        return; 
    }

    e.preventDefault(); 

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Send data to Google Forms in the background
    fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        // Success state
        submitButton.innerHTML = 'Information Submitted Successfully';
        form.reset(); // Clears the form inputs upon success
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.innerHTML = 'Error, please try again';
        submitButton.disabled = false;
    });
});

const modal = document.getElementById('enquireModal');
const openModal = () => modal.showModal();
const closeModal = () => modal.close();

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});