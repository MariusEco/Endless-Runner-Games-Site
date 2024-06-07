function setupGame() {
    var character = document.getElementById("character");
    var block = document.getElementById("block");
    var counter = 0;
    var gameOverMsg = document.getElementById("gameOverMsg");
    var tryAgainBtn = document.getElementById("tryAgainBtn");
    var playButton = document.getElementById("playButton");
    var gameContainer = document.querySelector(".game");
    var commentInput = document.getElementById("commentInput");

    block.style.animation = "none";

    function jump(event) {
        if (event.type == "click" || (event.key == " " && document.activeElement != commentInput)) {
            event.preventDefault();
            event.stopPropagation();
            if (character.classList.contains("animate")) {
                return;
            }
            character.classList.add("animate");
            setTimeout(function () {
                character.classList.remove("animate");
            }, 300);
        }
    }

    function startGame(event) {
        event.stopPropagation();
        resetGame();
        playButton.style.display = "none";
    }

    function resetGame() {
        block.style.left = "500px";
        character.style.top = "150px";
        block.style.animation = "block 1s infinite linear";
        checkDead = setInterval(function () {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
                block.style.animation = "none";
                gameOverMsg.style.display = "block";
                tryAgainBtn.style.display = "block";
                clearInterval(checkDead);
            } else {
                counter++;
                document.getElementById("scoreSpan").innerHTML = Math.floor(counter / 100);
            }
        }, 10);
    }

    playButton.addEventListener("click", startGame);
    gameContainer.addEventListener("click", function (event) { jump(event); });
    document.addEventListener("keydown", function (event) { jump(event); });

    tryAgainBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        gameOverMsg.style.display = "none";
        tryAgainBtn.style.display = "none";
        counter = 0;
        resetGame();
    });
}

setupGame();

function handleComments() {
    var commentForm = document.getElementById("commentForm");
    var commentInput = document.getElementById("commentInput");
    var commentsList = document.getElementById("commentsList");

    function loadComments() {
        var comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsList.innerHTML = '';
        comments.forEach(function (comment) {
            addCommentToList(comment);
        });
    }

    function saveComments(comments) {
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function addComment(commentText) {
        var comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(commentText);
        saveComments(comments);
        addCommentToList(commentText);
    }

    function addCommentToList(commentText) {
        var li = document.createElement("li");
        li.textContent = commentText;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-comment");
        li.appendChild(deleteButton);

        commentsList.appendChild(li);

        deleteButton.addEventListener("click", function () {
            commentsList.removeChild(li);
            deleteComment(commentText);
        });
    }

    function deleteComment(commentText) {
        var comments = JSON.parse(localStorage.getItem("comments")) || [];
        var index = comments.indexOf(commentText);
        if (index > -1) {
            comments.splice(index, 1);
        }
        saveComments(comments);
    }

    loadComments();

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var commentText = commentInput.value;
        addComment(commentText);
        commentInput.value = "";
    });
}

handleComments();
