const categoryIds = [
  "work",
  "play",
  "study",
  "social",
  "exercise",
  "self-care",
];

const dailyBtn = document.getElementById("daily-btn");
const weeklyBtn = document.getElementById("weekly-btn");
const monthlyBtn = document.getElementById("monthly-btn");
dailyBtn.addEventListener("click", () => updateTimeframe("daily"));
weeklyBtn.addEventListener("click", () => updateTimeframe("weekly"));
monthlyBtn.addEventListener("click", () => updateTimeframe("monthly"));

const categories = categoryIds.map((category) =>
  document.getElementById(category)
);

// Updates hours spent and last duration for each category based on timeframe
const updateCards = (data, timeframe) => {
  categories.forEach((catagory) => {
    let catagoryName = catagory.id;
    catagoryName = catagoryName.charAt(0).toUpperCase() + catagoryName.slice(1);
    let categoryData = data.find((item) => item.title === catagoryName);
    catagory.querySelector(
      ".hours-spent"
    ).innerText = `${categoryData.timeframes[timeframe].current}hrs`;
    catagory.querySelector(
      ".last-hours-spent"
    ).innerText = `${categoryData.timeframes[timeframe].previous}hrs`;
    let timeframeTitle = "Day";
    if (timeframe === "weekly") {
      timeframeTitle = "Week";
    } else if (timeframe === "daily") {
      timeframeTitle = "Day";
    } else {
      timeframeTitle = "Month";
    }
    catagory.querySelector(".last-report-duration").innerText = timeframeTitle;
  });
};

// Updates cards based on timeframe and active class to active btn
const updateTimeframe = (timeframe) => {
  fetch("https://github.com/itsdevdeepak/time-tracking-dashboard-main/blob/main/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      updateCards(data, timeframe);
    });
  if (timeframe === "daily") {
    dailyBtn.classList.add("active");
    weeklyBtn.classList.remove("active");
    monthlyBtn.classList.remove("active");
  } else if (timeframe === "weekly") {
    dailyBtn.classList.remove("active");
    weeklyBtn.classList.add("active");
    monthlyBtn.classList.remove("active");
  } else if (timeframe == "monthly") {
    dailyBtn.classList.remove("active");
    weeklyBtn.classList.remove("active");
    monthlyBtn.classList.add("active");
  } else {
    return;
  }
};

updateTimeframe("weekly");
