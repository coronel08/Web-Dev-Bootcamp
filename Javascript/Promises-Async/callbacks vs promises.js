// Create callback function
const fakeRequestsCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500
    setTimeout(() =>{
        if (delay > 4000){
            failure('Connection Timeout ')
        } else {
            success(`Here is fake data from ${url}`)
        }
    }, delay)
}

// Can turn into callback hell if we nest this.
fakeRequestsCallback('books.com', 
    function(response){
        console.log("It Worked")
        console.log(response)
    }, function(err){
        console.log("Error!!")
        console.log(err)
})


// Create promises function
const fakeRequestsPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500
        
        setTimeout(() => {
            if (delay > 4000){
                reject('Connection Timeout ')
            } else {
                resolve(`Here is Fake Data from ${url}`)
            }
        }, delay )
    })
}

// Promise chain using then and catch
fakeRequestsPromise('yelp.com/api/books/page1')
.then((data) =>{
        console.log("It worked!!! page1")
        console.log(data)
        return fakeRequestsPromise('yelp.com/api/books/page2')
    })
    .then((data) => {
        console.log("It worked page 2")
        console.log(data)
    })
    .catch((err) => {
        console.log("A request failed in Promise Chain")
        console.log(err)
    })
    
// Nested promises, done the verbose way
// fakeRequestsPromise('yelp.com/api/books/page1')
//     .then(() => {
//         console.log("It worked page 1")
//         fakeRequestsPromise('yelp.com/api/books/page2')
//             .then(() => {
//                 console.log("It worked page 2")
//             })
//             .catch(() => {
//                 console.log("Promise Error pg 2")
//             })
//     })
//     .catch(() => {
//         console.log("Promise Error pg1")
//     })