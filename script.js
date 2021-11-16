var Hangman = function(elem) {

    var alphabet = "abcdefghijklmnopqrstuvwxyz", // letters for player

        word = "javascript",
        // the array for random words
        word_list = ["javascript", "coding", "window", "ruby", "java", "button", "keyboard", "desktop", "monitor", "mouse", "program", "command", "system", "sound"],
        word_length,
        // where each guessed letter will be stored
        guessedLetters = [],
        
        displayed_word,
        lives_left = 6,
        // game message set to false
        game_complete = false;
        // show the letters used by the user
        var count = document.getElementById("used");
        
    // create DOM elements
    var top_display = quickCreateElement("div", "top-display"),     
        DOM_displayed_word = quickCreateElement("div", "displayed-word"),
        DOM_lives_left = quickCreateElement("div", "lives-left"),
        DOM_game_message = quickCreateElement("div", "message"),
        buttons_section = quickCreateElement("div", "buttons-section"),

        letter_buttons = [];    
        
    // create buttons
    for (var i=0; i<26; i++) {
        letter_buttons.push(quickCreateElement("button", "letter-button", alphabet[i]));
    }
    
    // organise DOM elements    
    top_display.appendChild(DOM_displayed_word);
    top_display.appendChild(DOM_lives_left);
    top_display.appendChild(DOM_game_message);
    
    for (var i = 0; i < 26; i++) {
        buttons_section.appendChild(letter_buttons[i]);
    }
    
    
    // HELPER FUNCTIONS
    
    function quickCreateElement(type, cls, id) {
        var ret = document.createElement(type);
        if (cls) { ret.classList.add(cls); }
        if (id) { ret.id = id; }
        return ret
    }
        
    function contains(arr, el) {
    // function to check if array contains elements
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == el) { return true }
        }
        return false
    };


    // PROCESS FUNCTIONS
    
    //funtion that helps restart the game
    function reset() {
        while(elem.lastChild) {
            elem.removeChild(elem.firstChild);
            count.textContent = " ";
        }
    };

    // randomize word
    function getWord() {
        word = word_list[Math.floor(Math.random() * word_list.length)];
        loadInitialDOM();
        render();   
    };
    
    //load all needed elements to function
    function loadInitialDOM() {    
        elem.appendChild(top_display);
        elem.appendChild(buttons_section);
    };

    //
    function render() {
        renderDisplayedWord();
        DOM_lives_left.innerHTML = "Lives left: " + lives_left;
        evaluateResult();
        if (game_complete) {

            DOM_game_message.innerHTML = game_complete;
        }
        renderButtons(game_complete);
    };

    function renderDisplayedWord() {
        displayed_word = "";
        //displaying the correct letter
        for (var i = 0; i < word.length; i++) {
            if (contains(guessedLetters, word[i])) {
                displayed_word += word[i];
            }
            else {
                //none to display but a blank
                displayed_word += "_";
            }
            //display should be same lenght of the random word
            displayed_word += (i == word.length) ? "" : " " ; //an if else statement
        }
        //calls to be displayed in site
        DOM_displayed_word.innerHTML = displayed_word;
    };
    
    //checker
    function evaluateResult() {
        //if it does not contain any blank anymore
        if (!contains(displayed_word, "_")) {
            game_complete = "You correctly guessed the word " + "\"" + word + "\"" + "!";
            DOM_game_message.style.border = "thick solid #50C878"
            DOM_game_message.style.backgroundColor = "#50C878";        
        }
        //if lives left is less than or equal to 0
        if (lives_left <= 0) {
            game_complete = "You lose! The correct word was " + "\"" + word + "\"";
            DOM_game_message.style.border = "thick solid #E96868"
            DOM_game_message.style.backgroundColor = "#E96868";      
        }
    };

    //makes the buttons unclickable
    function renderButtons(game_over) {
        for (var i = 0; i < 26; i++) {
            b = letter_buttons[i];
            b.innerHTML = "";
            b.removeEventListener("click", letter_select);
            b.innerHTML = alphabet[i];
            if (!game_over && !contains(guessedLetters, alphabet[i])) {
                b.addEventListener("click", letter_select);
            }
            else {
                b.classList.add("deactivated");
            }
        }
    };
    
    function letter_select() {
        var letter = event.target.id;
        // if not there..
        guessedLetters.push(letter);
        count.textContent = guessedLetters;
        //if the letter is not in the word
        if (!contains(word, letter)) {
            lives_left -= 1;
        }
        render();
    };
    reset();
    getWord(); 

};

document.addEventListener('DOMContentLoaded', function() {

    var new_game_button = document.getElementById("new-game-button")
        hangman_div = document.getElementById("hangman");
        
    new_game_button.addEventListener("click", function() {
        new Hangman(hangman_div);
    });
});
