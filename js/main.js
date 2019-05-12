document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;

    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteURL
    }


    if (localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();

    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url) {
    //console.log(url);
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    const bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;

        bookmarksResults.innerHTML += `
            <div class="bookmark"> 
                <h3> <a href="${url}" target="_blank"> ${name} </a></h3>
                <div class="delete">
                    <a onclick="deleteBookmark('${url}')" href="#"> 
                        <svg width="17px" height="22px" viewBox="0 0 17 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(-1213.000000, -547.000000)" stroke="#202020" stroke-width="0.649999976">
                                <g transform="translate(210.000000, 543.000000)">
                                    <g transform="translate(1003.000000, 5.000000)">
                                        <path d="M0,2.66666667 L17,2.66666667 M5.23076923,2.66666667 L5.23076923,1.3 C5.23076923,0.582029825 5.80160617,1.48029737e-16 6.50576923,0 L10.4942308,0 C11.1983938,0 11.7692308,0.582029825 11.7692308,1.3 L11.7692308,2.66666667 M15.2019231,2.66666667 L14.2538462,18.3666667 C14.2364665,19.2612889 13.529341,19.9822795 12.6519231,20 L4.34807692,20 C3.47065896,19.9822795 2.76353354,19.2612889 2.74615385,18.3666667 L1.79807692,2.66666667" id="Shape"></path>
                                        <path d="M8.5,5.33333333 L8.5,17.3333333 M5.23076923,5.33333333 L5.88461538,17.3333333 M11.7692308,5.33333333 L11.1153846,17.3333333" id="Shape"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                        </svg>
                    </a>
                </div>
            </div>
        `;
    }
}

function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please, fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Please, use a valid URL!');
        return false;
    }

    return true;
}