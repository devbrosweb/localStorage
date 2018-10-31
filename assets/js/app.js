//Variable
const tweetList = document.getElementById('tweet-list');

//Functions
const newTweet = function (e){
    e.preventDefault();
    //console.log('Form submitted!!');

    //read the textaera
    let tweet = document.getElementById('tweet').value;

    //create button to remove list
    let removeListBtn = document.createElement('a');
    removeListBtn.textContent = 'X';
    removeListBtn.classList.add('remove-tweet');

    //create a list element
    let li = document.createElement('li');
    li.textContent = tweet;

    //append button to list
    li.appendChild(removeListBtn);

    //append lo to the tweetList
    tweetList.appendChild(li);

    addTweetLocalStorage(tweet);

    alert('tweet added');

    this.reset();
}

//remove the tweet from the DOM
const removeTweet = function(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
    }

    let tweet = e.target.parentElement.textContent;
    removeTweetFromStorage(tweet);
} 

const addTweetLocalStorage = function (tweet){
    let tweets = getTweetFromStorage();

    //add tweet to array
    tweets.push(tweet);

    //add tweet to storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
const getTweetFromStorage = function (){
    let tweets = [];
    let tweetsLS = localStorage.getItem('tweets');
    
    //if no empty return the tweets
    if(tweetsLS){
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

const localStorageOnLoad = function(){
    let tweets = getTweetFromStorage();

    //loop fro tweets
    tweets.forEach(function(tweet){
        //create button to remove list
        let removeListBtn = document.createElement('a');
        removeListBtn.textContent = 'X';
        removeListBtn.classList.add('remove-tweet');

        //create a list element
        let li = document.createElement('li');
        li.textContent = tweet;

        //append button to list
        li.appendChild(removeListBtn);

        //append lo to the tweetList
        tweetList.appendChild(li);
    });
}

const removeTweetFromStorage = function(tweet){
    //get all tweets from storage
    let tweetAll = getTweetFromStorage();

    //remove X from text tweet
    let tweetDelete = tweet.substr(0, tweet.length- 1);
    
    tweetAll.forEach(function(tweet, index){
        if(tweetDelete === tweet){
            tweetAll.splice(index, 1);
        }
    });

    //add tweet to storage
    localStorage.setItem('tweets', JSON.stringify(tweetAll));
}

const eventListeners = function (){
    //form
    document.querySelector('#form').addEventListener('submit', newTweet);

    //remove tweet from the list
    tweetList.addEventListener('click', removeTweet);

    //onload document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//Event Listeners
eventListeners();


