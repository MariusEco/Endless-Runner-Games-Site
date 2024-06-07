document.addEventListener('DOMContentLoaded', function () {
    let text = document.querySelector('footer p');

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function blinkColor() {
        text.style.color = getRandomColor();
    }

    setInterval(blinkColor, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    let scrollToTopLink = document.querySelector('footer a[href="#top"]');
    scrollToTopLink.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var articles = document.querySelectorAll("article");
    articles.forEach(function (article) {
        var italicApplied = false;
        var boldApplied = false;
        article.addEventListener("click", function (event) {
            var clickedElement = event.target;
            var articleElement = event.currentTarget;
            if (!italicApplied && !boldApplied) {
                if (clickedElement.tagName == "P") {
                    clickedElement.style.fontStyle = "italic";
                    italicApplied = true;
                } else {
                    articleElement.style.fontWeight = "bold";
                    boldApplied = true;
                }
            }
        });
    });
});