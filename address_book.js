
window.onload = function() {
    
    //setting buttons
    var addButton = document.getElementById("submit");
    var cancelButton = document.getElementById("reset");

    //form field
    var fullname = document.getElementById("fullname");
    var number = document.getElementById("number");
    var email = document.getElementById("email");  
    var city = document.getElementById("city");
    
    //show address book
    var addBookTag = document.getElementById("demo");
    var editBookTag = document.getElementById("edit");

    //declare storage array
    var addressBook = [];

    //setting eventlisteners to buttons
    addButton.addEventListener("click",addToBook);
    addBookTag.addEventListener("click",removeEntry);
    addBookTag.addEventListener("click",editEntry);

    //defining the storage form
    function jsonStructure (fullname,number,email,city){
        this.fullname = fullname;
        this.number = number;
        this.email = email;
        this.city = city;
    }

    // defining my functions


//function added to submit button
    function addToBook (){
        var isNull = fullname.value!='' && number.value!='' && email.value!='' && city.value!='';
       
        if(isNull){
            var obj = new jsonStructure(fullname.value, number.value,email.value,city.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);

            clearFom();

            displayContacts();    
        } 
    }

    // function added to delete-contact button
    function removeEntry(e){
        if (e.target.classList.contains("delbutton")){
            var removeID = e.target.getAttribute("data-id");
            addressBook.splice(removeID, 1);
            localStorage["addbook"] = JSON.stringify(addressBook);
            displayContacts();
        }

    }

    //function to clear form after submitting
    function clearFom(){
        var frm = document.querySelectorAll(".entryfields");
        for (var i in frm){
            frm[i].value = '';
        }
    };

    // function to display submitted contacts
    function displayContacts () {

        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]";
        }else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookTag.innerHTML = '<h2>Contact List</h2>';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                str += '<div class="number"><p>' + addressBook[n].number + '</p></div>';
                str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                str += '<div class="city"><p>'+ addressBook[n].city + '</p></div>';
                str += '<div class="del"><button class = "delbutton" data-id = "'+ n + '">Delete Contact</button></div>';
                str += '<div class="edit"><button class = "editbutton" data-id = "'+ n + '">Edit Contact</button></div>';
                str += '</div>';
                str += '<hr>'
                addBookTag.innerHTML += str;

            }
        }
    }
    displayContacts();


    //am not done yet!!!!!!!!!!!!!!!!!!!!!!!!!!!
    function editEntry(e){
        if (e.target.classList.contains("editbutton")){
            addressBook = JSON.parse(localStorage['addbook']);
            var editID = e.target.getAttribute("data-id");
                // i want to splice and push then edited displayContact back
            
                for (var n in addressBook){
                    document.getElementById("fullname").value = addressBook[n].fullname;
                    document.getElementById("number").value =addressBook[n].number;
                    document.getElementById("email").value= addressBook[n].email;
                    document.getElementById("city").value = addressBook[n].city;
                }
            addressBook.splice(editID, 1);
            
            localStorage["addbook"] = JSON.stringify(addressBook);
            displayContacts();
        }

    }
};
