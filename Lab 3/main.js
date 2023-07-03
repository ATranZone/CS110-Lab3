var tweetArr = [];

$(document).ready(function(){    //this template provided to me from the TA
    const url = "http://50.21.190.71/get_tweets"
    
    // reset any changes from the previous useage 
        // previous tweets
        // checkbox
        // if there is still text in search bar

    function autorefresh() {
        // Get the status of the checkbox
        var isChecked = document.getElementById("checkBox").checked;
        // If it is not checked, then we will call our fetch every X seconds
        if (isChecked == false) {
            time = setInterval(function () {
               getRequest();
               console.log("unchecked")
            }, 10000);
        } else if (isChecked == true) {
            // If it is checked, we want it to pause, so we clear the interval
            clearInterval(time);
            console.log("checked")
        }
    }

    // Function that automatically fetches new tweets
    getRequest();
    autorefresh();
    // Get the checkbox, add a listener that activates when checked/unchecked
    document.getElementById('feedRefresh').addEventListener('click', autorefresh);
    // getRequest();
    // setInterval(getRequest, 300000)
    


    function getRequest() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
        // do something with data
            console.log(data[0]);
            console.log(data[0].user_name);

            // Remove duplicates            

            // Set the center div to be the tweets
            // data.forEach(element => returnUsername())

            // returnUsername(data)
            returnTweet(data);

            // When the search is activated:
            // Search all tweets for matching values
            // Set the current tweets to be ones that match search value
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }

    function returnTweet(element){
        let tempArr = [];
        const tweetDiv = document.getElementById("content-center");
        const tweetUser = document.getElementsByClassName("tweetUser") // tweet username
        for(let i =0;i<element.length;i++){
            tempArr.push(element[i].user_name);
            let tempTweet = document.createElement('div');
            let tempContent = document.createElement('div');
            let tempUser = document.createElement('div');
            let tempText = document.createElement('div');
            let tempAT = document.createElement('span');
            let tempAvatar = document.createElement('img');
            let tempDate = document.createElement('div')
            var http = new XMLHttpRequest();
            let imgURL = element[i].avatar;
            http.open("HEAD", imgURL,false);
            http.send();
            // let temptweetDiv = document.createElement('div');
            tweetDiv.appendChild(tempTweet) // the entire tweet itself
            tempTweet.classList.add("tweet");
            tempTweet.appendChild(tempAvatar);
            if (http.status != 404){
                tempAvatar.src = element[i].avatar;
            }
            else{
                tempAvatar.src = "images/ratatouille.jpg";
            }
            tempAvatar.classList.add('remyT');
            tempTweet.appendChild(tempContent);
            tempContent.classList.add("tweetContents");
            tempContent.appendChild(tempUser);
            tempUser.classList.add('tweetUser');
            tempUser.innerHTML = element[i].user_name;
            tempContent.appendChild(tempText);
            tempText.classList.add('text');
            tempText.innerHTML = element[i].text;
            tempUser.appendChild(tempAT);
            tempAT.classList.add('tweetAT');
            tempUser.appendChild(tempDate);
            tempDate.innerHTML = element[i].date.split(' ')[0]
            tempDate.classList.add('tweetDate')
            tempAT.innerHTML = ' @' +element[i].user_name+' ';
            
            
        }
        
        return tempArr;
    }

    function removeDuplicates(duplicatesDataArr) {
        // For all of new tweets
        // Check the array of all previous tweets for any duplicates
        // Remove duplicates
        // If not a duplicate, add it to list of all previous tweets
    }

    function searchArray(dataArr, value) {
        // Go through each tweet, and check if there is a matching value in the tweet
        // Return array of all matching tweets

    }

    
});