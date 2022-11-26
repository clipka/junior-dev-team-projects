const number_element = document.querySelector('#number');
const form = document.querySelector('#game');
const message_element = document.querySelector('small');
const attempts_element = document.querySelector('#attempts');
const result_element = document.getElementById('won');

// Returns a random integer from 0 to 100:
const right_number = Math.floor(Math.random() * 101);
let num_guesses = 1;


const check_number = (num) => {
    if (num == right_number) {
        return 0;
    }
    else if (num < right_number) {
        return -1;
    }
    else {
        return 1;
    }
}

const show_error = (message) => {
    number_element.classList.remove('success');
    number_element.classList.add('error');
    message_element.classList.remove('success_text');
    message_element.classList.add('error_text');
    message_element.textContent = message;
}

const show_success = (input, message) => {
    number_element.classList.remove('error');
    number_element.classList.add('success');
    message_element.classList.remove('error_text');
    message_element.classList.add('success_text');
    message_element.textContent = message;
}

const check_guess = () => {
    let valid = false;
    const number = parseInt(number_element.value.trim());

    console.log("Eingegebene Zahl: " + number);

    if (isNaN(number)) {
       show_error("Bitte eine Zahl eingeben");
    }
    else if (check_number(number) != 0) {
        if (check_number(number) < 0) {
            show_error("Die Zahl ist zu klein!");
        }
        else {
            show_error("Die Zahl ist zu groß!");
        }
    }
    else {
        // show success
        show_success("Gewonnen!");
        valid = true;
    }

    return valid;
}

form.addEventListener('submit', function(e) {
    // prevent form from submitting
    e.preventDefault();

    let is_guess_valid = check_guess();

    if (is_guess_valid) {
        result_element.hidden = false;
    }

    attempts_element.textContent = num_guesses.toString();
    num_guesses += 1;
});
