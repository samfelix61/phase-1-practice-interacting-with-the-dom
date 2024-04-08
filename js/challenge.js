document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const submitButton = document.getElementById('submit');
    const commentList = document.getElementById('comments-list'); // Select the comment list
    let count = parseInt(counter.textContent);
    let likes = {};
    let timer;

    function updateCounter() {
        counter.textContent = count;
    }

    function updateLikes() {
        likesList.innerHTML = '';
        for (let number in likes) {
            const li = document.createElement('li');
            li.textContent = `${number} has been liked ${likes[number]} times`;
            likesList.appendChild(li);
        }
    }

    minusButton.addEventListener('click', function() {
        count--;
        updateCounter();
    });

    plusButton.addEventListener('click', function() {
        count++;
        updateCounter();
    });

    heartButton.addEventListener('click', function() {
        if (!likes[count]) {
            likes[count] = 1;
        } else {
            likes[count]++;
        }
        updateLikes();
    });

    pauseButton.addEventListener('click', function() {
        if (pauseButton.textContent === 'pause') {
            clearInterval(timer);
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
            pauseButton.textContent = 'resume';
        } else {
            timer = setInterval(function() {
                count++;
                updateCounter();
            }, 1000);
            minusButton.disabled = false;
            plusButton.disabled = false;
            heartButton.disabled = false;
            pauseButton.textContent = 'pause';
        }
    });

    timer = setInterval(function() {
        count++;
        updateCounter();
    }, 1000);

    // Event listener for submitting comments
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = commentInput.value.trim();
        if (comment !== '') {
            // Create a new list item to display the comment
            const commentItem = document.createElement('li');
            commentItem.textContent = comment;
            // Append the comment to the comments list
            commentList.appendChild(commentItem);
            // Clear the input field after submitting the comment
            commentInput.value = '';
        }
    });
});