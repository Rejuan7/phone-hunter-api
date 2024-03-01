const loadPhones = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones);          
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''; 
    
    //show all button 
      const showAllContainer = document.getElementById('show-all-container');
      if(phones.length > 12){
              showAllContainer.classList.remove('hidden')
      }
      else{
              showAllContainer.classList.add('hidden');
      }
      // only show 12 items
      phones = phones.slice(0,12);

    phones.forEach(phone =>{
//            console.log(phone);
           const phoneCard = document.createElement('div')
           phoneCard.classList = `card p-3 bg-gray-100 shadow-xl`;
           phoneCard.innerHTML = `
           <figure><img src="${phone.image}" alt="Shoes" /></figure>
           <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
             <div class="card-actions justify-center">
               <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
             </div>
           </div>
           `;
           phoneContainer.appendChild(phoneCard);   
    })
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) =>{
//        console.log('click',id)
       const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
       const data = await res.json();
       const phone = data.data;
        showPhoneDetails(phone);     
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    show_details_modal.showModal()        
}

const handleSearch = () =>{
     toggleLoadingSpinner(true);         
     const searchField = document.getElementById('search-field');
     const searchText = searchField.value;
//      console.log(searchText);
     loadPhones(searchText);         
}

const toggleLoadingSpinner = (isLoading) =>{
     const loadingSpinner = document.getElementById('loading-spinner');
     if(isLoading){
         loadingSpinner.classList.remove('hidden');     
     }
     else{
         loadingSpinner.classList.add('hidden');     
     }
}



