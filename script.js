const filterButtons = document.querySelectorAll('.filter-btn');
  const studioCols = document.querySelectorAll('.studio-item');
  const noResults = document.getElementById('noResults');
 
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
 
      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;
 
      studioCols.forEach(col => {
        const category = col.getAttribute('data-category');
        const show = (filter === 'all' || category === filter);
        col.classList.toggle('hidden', !show);
        if (show) visibleCount++;
      });
 
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });


  // =========================================================
// DYNAMIC SERVICES PAGE
// =========================================================

const studioName = document.getElementById("studioName");
const studioPrice = document.getElementById("studioPrice");
const serviceImage = document.getElementById("serviceImage");
const featureList = document.getElementById("featureList");
const bookButton = document.getElementById("bookButton");


if (studioName && studioPrice && serviceImage && featureList) {

    // Get studio name from URL
    const params = new URLSearchParams(window.location.search);
    const studio = params.get("studio");


    // Studio information
    const studioData = {

        podcast: {
            name: "Podcast Studio",
            price: "৳500 / hour",
            image: "podcast.jpg",
            features: [
                "Professional microphone",
                "Soundproof recording room",
                "Headphones",
                "Audio recording setup"
            ]
        },

        video: {
            name: "Video Studio",
            price: "৳800 / hour",
            image: "video.jpg",
            features: [
                "Camera setup",
                "Studio lighting",
                "Green screen",
                "Microphone"
            ]
        },

        photography: {
            name: "Photography Studio",
            price: "৳600 / hour",
            image: "photography.jpg",
            features: [
                "Professional camera",
                "Studio lighting",
                "Photography backdrop",
                "Reflectors"
            ]
        },

        audio: {
            name: "Audio Studio",
            price: "৳700 / hour",
            image: "audio.jpg",
            features: [
                "Professional microphone",
                "Audio interface",
                "Soundproof room",
                "Headphones"
            ]
        }

    };


    // Check if selected studio exists
    if (studioData[studio]) {

        const selectedStudio = studioData[studio];


        // Change name
        studioName.textContent = selectedStudio.name;


        // Change price
        studioPrice.textContent = selectedStudio.price;


        // Change image
        serviceImage.src = selectedStudio.image;


        // Change facilities
        featureList.innerHTML = "";

        selectedStudio.features.forEach(function(feature) {

            featureList.innerHTML += `
                <li>
                    <i class="bi bi-check-circle-fill"></i>
                    ${feature}
                </li>
            `;

        });


        // Change booking button
        bookButton.href = "booking.html?studio=" + studio;

    }

}

// =========================================================
// REVIEWS
// =========================================================

const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");
const submitReview = document.getElementById("submitReview");
const userReviews = document.getElementById("userReviews");
const ratingStars = document.querySelectorAll(".rating span");

let selectedRating = 0;


// Select stars
ratingStars.forEach(function(star) {

    star.addEventListener("click", function() {

        selectedRating =
            Number(star.getAttribute("data-rating"));

        ratingStars.forEach(function(s) {

            const rating =
                Number(s.getAttribute("data-rating"));

            if (rating <= selectedRating) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }

        });

    });

});


// Load saved reviews
if (submitReview) {

    const savedReviews =
        JSON.parse(localStorage.getItem("reviews")) || [];

    savedReviews.forEach(function(review) {

        addReviewToPage(
            review.name,
            review.text,
            review.rating
        );

    });


    // Submit review
    submitReview.addEventListener("click", function() {

        const name = reviewName.value.trim();
        const text = reviewText.value.trim();


        // Check name
        if (name === "") {
            alert("Please enter your name.");
            return;
        }


        // Check review
        if (text === "") {
            alert("Please write a review.");
            return;
        }


        // Check rating
        if (selectedRating === 0) {
            alert("Please select a star rating.");
            return;
        }


        // Create review
        const review = {
            name: name,
            text: text,
            rating: selectedRating
        };


        // Save review
        savedReviews.push(review);

        // Keep only 3 reviews
        if (savedReviews.length > 3) {
            savedReviews.shift();
        }

        localStorage.setItem(
            "reviews",
            JSON.stringify(savedReviews)
        );


        // Show review
        addReviewToPage(
            name,
            text,
            selectedRating
        );


        // Clear form
        reviewName.value = "";
        reviewText.value = "";

        selectedRating = 0;

        ratingStars.forEach(function(star) {
            star.classList.remove("active");
        });

    });

}


// Add review to page
function addReviewToPage(name, text, rating) {

    const reviewCard =
        document.createElement("div");

    reviewCard.className = "review-card";


    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {
            stars += "★";
        } else {
            stars += "☆";
        }

    }


    reviewCard.innerHTML = `

        <div class="stars">
            ${stars}
        </div>

        <p class="review-text"></p>

        <p class="review-name"></p>

    `;


    reviewCard.querySelector(".review-text").textContent =
        '"' + text + '"';

    reviewCard.querySelector(".review-name").textContent =
        "— " + name;


    // Keep only 3 visible reviews
    if (userReviews.children.length >= 3) {
        userReviews.removeChild(
            userReviews.firstElementChild
        );
    }

    userReviews.appendChild(reviewCard);

}
// =========================================================
// BOOKING PAGE
// =========================================================

const confirmBooking = document.getElementById("confirmBooking");

if (confirmBooking) {

    const confirmationPopup =
        document.getElementById("confirmationPopup");

    const doneBtn =
        document.getElementById("doneBtn");

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const studioSelect =
        document.getElementById("studio");

    const dateInput =
        document.getElementById("date");

    const startTimeInput =
        document.getElementById("startTime");

    const durationInput =
        document.getElementById("duration");

    const estimatedPrice =
        document.getElementById("estimatedPrice");

    const bookingImage =
        document.getElementById("bookingImage");


    // =========================
    // UPDATE STUDIO
    // =========================

    function updateStudio() {

        const selectedOption =
            studioSelect.options[
                studioSelect.selectedIndex
            ];

        if (studioSelect.value === "") {

            estimatedPrice.textContent = "৳0";

            bookingImage.src = "video.jpg";

            durationInput.value = "";
            durationInput.disabled = false;

            return;
        }


        // Change image
        const imageName =
            selectedOption.getAttribute("data-image");

        if (imageName) {
            bookingImage.src = imageName;
        }


        // Change price
        estimatedPrice.textContent =
            "৳" + studioSelect.value;


        // Package duration
        const packageDuration =
            selectedOption.getAttribute("data-duration");


        if (packageDuration) {

            // Package has fixed duration
            durationInput.value = packageDuration;
            durationInput.disabled = true;

        } else {

            // Studio duration can be selected
            durationInput.value = "";
            durationInput.disabled = false;
        }
    }


    studioSelect.addEventListener(
        "change",
        updateStudio
    );
    durationInput.addEventListener("change", function () {

    // Don't calculate if no studio is selected
    if (studioSelect.value === "") {
        estimatedPrice.textContent = "৳0";
        return;
    }

    const selectedOption =
        studioSelect.options[
            studioSelect.selectedIndex
        ];

    const price =
        Number(studioSelect.value);

    const isPackage =
        selectedOption.getAttribute("data-package");

    // Packages have a fixed price
    if (isPackage) {
        estimatedPrice.textContent =
            "৳" + price;
        return;
    }

    // Studios are charged by the hour
    const duration =
        Number(durationInput.value);

    if (duration > 0) {
        estimatedPrice.textContent =
            "৳" + (price * duration);
    }
});


    // =========================
    // AUTO SELECT FROM URL
    // =========================

    const params =
        new URLSearchParams(
            window.location.search
        );

    const selectedStudio =
        params.get("studio");

    const selectedPackage =
        params.get("package");

    const studioOptions =
        studioSelect.options;


    if (selectedStudio) {

        for (
            let i = 0;
            i < studioOptions.length;
            i++
        ) {

            const optionStudio =
                studioOptions[i]
                    .getAttribute("data-studio");

            if (optionStudio === selectedStudio) {

                studioSelect.selectedIndex = i;

                updateStudio();

                break;
            }
        }
    }


    if (selectedPackage) {

        for (
            let i = 0;
            i < studioOptions.length;
            i++
        ) {

            const optionPackage =
                studioOptions[i]
                    .getAttribute("data-package");

            if (optionPackage === selectedPackage) {

                studioSelect.selectedIndex = i;

                updateStudio();

                break;
            }
        }
    }


    // =========================
    // CONFIRM BOOKING
    // =========================

    confirmBooking.addEventListener(
        "click",
        function () {

            // Check name
            if (nameInput.value.trim() === "") {

                alert("Please enter your name.");
                return;
            }


            // Check email
            if (emailInput.value.trim() === "") {

                alert("Please enter your email.");
                return;
            }


            // Check studio
            if (studioSelect.value === "") {

                alert("Please select a studio.");
                return;
            }


            // Check date
            if (dateInput.value === "") {

                alert("Please select a date.");
                return;
            }


            // Check start time
            if (startTimeInput.value === "") {

                alert("Please select a start time.");
                return;
            }


            // Check duration
            if (durationInput.value === "") {

                alert("Please select a duration.");
                return;
            }


            const selectedOption =
                studioSelect.options[
                    studioSelect.selectedIndex
                ];

            const studioName =
                selectedOption.text;

            const price =
                Number(studioSelect.value);

            const isPackage =
                selectedOption.getAttribute(
                    "data-package"
                );


            const duration =
                Number(durationInput.value);


            // =========================
            // CONVERT START TIME
            // =========================

            function convertToMinutes(time) {

                const parts =
                    time.split(" ");

                const timeParts =
                    parts[0].split(":");

                let hour =
                    Number(timeParts[0]);

                const minute =
                    Number(timeParts[1]);

                const period =
                    parts[1];

                if (period === "PM" && hour !== 12) {
                    hour += 12;
                }

                if (period === "AM" && hour === 12) {
                    hour = 0;
                }

                return hour * 60 + minute;
            }


            const startMinutes =
                convertToMinutes(
                    startTimeInput.value
                );


            const endMinutes =
                startMinutes + duration * 60;


            // Studio closing time = 10 PM
            if (endMinutes > 22 * 60) {

                alert(
                    "This booking goes beyond the studio closing time. Please choose an earlier start time or shorter duration."
                );

                return;
            }


            // =========================
            // CREATE TIME RANGE
            // =========================

            function formatTime(minutes) {

                let hour =
                    Math.floor(minutes / 60);

                const minute =
                    minutes % 60;

                const period =
                    hour >= 12 ? "PM" : "AM";

                if (hour > 12) {
                    hour -= 12;
                }

                if (hour === 0) {
                    hour = 12;
                }

                const minuteText =
                    minute.toString().padStart(2, "0");

                return hour + ":" +
                    minuteText + " " +
                    period;
            }


            const endTime =
                formatTime(endMinutes);

            const timeRange =
                startTimeInput.value +
                " - " +
                endTime;


            // =========================
            // CHECK EXISTING BOOKINGS
            // =========================

            const bookings =
                JSON.parse(
                    localStorage.getItem("bookings")
                ) || [];


            const newStart =
                startMinutes;

            const newEnd =
                endMinutes;


            const conflict =
                bookings.some(function (booking) {

                    if (
                        booking.studio !== studioName ||
                        booking.date !== dateInput.value
                    ) {
                        return false;
                    }


                    // Ignore old bookings
                    // that don't have time information
                    if (
                        !booking.startMinutes ||
                        !booking.endMinutes
                    ) {
                        return false;
                    }


                    return (
                        newStart < booking.endMinutes &&
                        newEnd > booking.startMinutes
                    );
                });


            if (conflict) {

                alert(
                    "This studio is already booked for the selected time. Please choose another time."
                );

                return;
            }


            // =========================
            // CALCULATE PRICE
            // =========================

            let total = price;


            // Studios are charged hourly
            if (!isPackage) {

                total =
                    price * duration;
            }


            // =========================
            // FORMAT DATE
            // =========================

            const dateObject =
                new Date(dateInput.value);

            const formattedDate =
                dateObject.toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );


            // =========================
            // SHOW CONFIRMATION
            // =========================

            document.getElementById(
                "confirmName"
            ).textContent =
                nameInput.value;

            document.getElementById(
                "confirmStudio"
            ).textContent =
                studioName;

            document.getElementById(
                "confirmDate"
            ).textContent =
                formattedDate;

            document.getElementById(
                "confirmDuration"
            ).textContent =
                timeRange +
                " (" +
                duration +
                " Hours)";

            document.getElementById(
                "confirmTotal"
            ).textContent =
                "৳" + total;


            // =========================
            // SAVE BOOKING
            // =========================

            const booking = {

                name: nameInput.value,

                email: emailInput.value,

                studio: studioName,

                date: dateInput.value,

                startTime: startTimeInput.value,

                duration: duration,

                timeRange: timeRange,

                startMinutes: startMinutes,

                endMinutes: endMinutes,

                total: total
            };


            bookings.push(booking);


            localStorage.setItem(
                "bookings",
                JSON.stringify(bookings)
            );


            // Show popup
            confirmationPopup.classList.add(
                "show"
            );

        }
    );
    // =========================
    // DONE BUTTON
    // =========================

    doneBtn.addEventListener(
        "click",
        function () {

            confirmationPopup.classList.remove(
                "show"
            );

        }
    );

}
// Owner Dashboard

const bookingTableBody =
    document.getElementById("bookingTableBody");

const noBookings =
    document.getElementById("noBookings");

if (bookingTableBody) {

    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    if (bookings.length === 0) {

        noBookings.style.display = "block";

    } else {

        noBookings.style.display = "none";

        bookings.forEach(function(booking) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.studio}</td>
                <td>${booking.date}</td>
                <td>${booking.timeRange}</td>
                <td>৳${booking.total}</td>
            `;

            bookingTableBody.appendChild(row);
        });
    }
}
const clearBookings =
    document.getElementById("clearBookings");

if (clearBookings) {

    clearBookings.addEventListener("click", function () {

        const confirmClear =
            confirm(
                "Are you sure you want to remove all bookings?"
            );

        if (confirmClear) {

            localStorage.removeItem("bookings");

            location.reload();

        }

    });

}