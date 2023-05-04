class VideoGame{
    title:string;
    price:number;
    rating:string;
    isDigitalOnly:boolean;
}

window.onload = function(){
    let addBtn = 
        <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame;
}

/**
 * Clears all errors in the validation summary
 */
function clearAllErrors(){
    let errSummary = getById("validation-summary");
    errSummary.innerText = "";
}

function addVideoGame(){
    console.log("Add video game was called");
    clearAllErrors();

    if(isAllDataValid()){
        let game:VideoGame = getVideoGame();
        displayGame(game);
    }
    else{
        displayRatingsLink();
    }
}

function displayRatingsLink(){
    let ratingsElements = document.querySelectorAll(".rating-error");
    for(let i = 0; i < ratingsElements.length; i++){
        let currElem = <HTMLElement>ratingsElements[i];
        currElem.onclick = goToRatingsPage;
        // currElem.innerHTML += "<a target='_blank' href='https://www.esrb.org/'>Click here for info</a>";
    }
}

function goToRatingsPage(){
    window.open("https://www.esrb.org/", "_blank");
}

function getById(id:string){
    return document.getElementById(id);
}

/**
 * Gets all game data from the form
 * and returns it in a VideoGame object
 */
function getVideoGame():VideoGame{
    let game = new VideoGame();

    // Populate with data from the form
    let titleInput = <HTMLInputElement>getById("title");
    game.title = titleInput.value;

    let priceInput = <HTMLInputElement>getById("price");
    game.price = parseFloat(priceInput.value);

    let ratingInput = <HTMLSelectElement>getById("rating");
    game.rating = ratingInput.value;

    let digitalOnly = <HTMLInputElement>getById("online");
    game.isDigitalOnly = digitalOnly.checked;
    /*if(digitalOnly.checked){
        game.isDigitalOnly = true;
    }
    else{
        game.isDigitalOnly = false;
    }*/
    console.log(game);
    return game;
}

function displayGame(myGame:VideoGame):void{
    let displayDiv = getById("display");

    // Create <h2> with game title
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;

    // Create paragraph with game details
    let gameInfo = document.createElement("p");
    let gameMediumDisplay = "";
    if(myGame.isDigitalOnly){
        gameMediumDisplay = "This is a digital only game.";
    }
    else{
        gameMediumDisplay = "You can come buy a physical copy!";
    }
    gameInfo.innerText = `${myGame.title} has a rating of ${myGame.rating}. ` +
        `It costs $${myGame.price.toFixed(2)}. ${gameMediumDisplay}`;

    // Add <h2> in the <div id="display">
    displayDiv.appendChild(gameHeading);
    // Add <p> game info
    displayDiv.appendChild(gameInfo);
}

function getInputById(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

function isAllDataValid(){
    let isValid = true;

    let title = getInputById("title").value;
    if(title == ""){
        isValid = false;
        addErrorMessage("Title is required");
    }

    let price = getInputById("price").value;
    let priceValue = parseFloat(price);
    if(price == "" || isNaN(priceValue)){
        isValid = false;
        addErrorMessage("Price is required and must be a number");
    }

    let rating = (<HTMLOptionElement>getById("rating")).value
    if(rating == ""){
        isValid = false;
        addErrorMsgWithCustomClass("You must choose a rating!", "rating-error");
    }

    return isValid;
}

function addErrorMessage(errMsg:string) {
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}

function addErrorMsgWithCustomClass(errMsg:string, cssClass:string){
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}