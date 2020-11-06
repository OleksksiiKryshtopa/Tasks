window.onload = () => {
    let cards = [];
    let filterState = { from: null, to: null };
    let sortState = 'NONE';
    let index = 0;
  
    const inputForm = document.querySelector('.input-form');
    const filterForm = document.querySelector('.filter-form');
    const sortForm = document.querySelector('.sort-form');
  
    const nameInput = document.querySelector('.input-form__name-input');
    const priceInput = document.querySelector('.input-form__price-input');
    const descriptionInput = document.querySelector(
      '.input-form__description-input'
    );
  
    const validatePrice = (price) => {
      return price >= 0 ? true : false;
    };
    const setCards = (newCards) => {
      cards = newCards;
      fullUpdate();
    };
    const setFilterState = (newFilterState) => {
      filterState = newFilterState;
      fullUpdate();
    };
    const setSortState = (newSortState) => {
      sortState = newSortState;
      fullUpdate();
    };
    const getSum = () =>
      cards.reduce((total, item) => total + parseInt(item.price, 10), 0);
  
    const updateSum = () =>
      (document.querySelector('.price-sum').innerHTML = `Sum: ${getSum()}`);
  
    const updateCards = () => {
      let cardList = document.querySelector('.card-list');
  
      cardList.innerHTML = '';
  
      let { from, to } = filterState;
  
      if (!from) from = 0;
      if (!to) to = Infinity;
  
      const resultedCards = cards.filter(
        (item) => from <= item.price && to >= item.price
      );
  
      if (sortState != 'NONE') {
        resultedCards.sort((a, b) => a.price - b.price);
        if (sortState == 'DESC') {
          resultedCards.reverse();
        }
      }
  
      resultedCards.forEach((card) => {
        cardList.append(
          createCard(card.name, card.price, card.description, card.id)
        );
      });
  
      console.log(cards);
    };
    const updateFilterInfo = () => {
      if (!filterState.from && !filterState.to) {
        document.querySelector('.filtered-from-to').innerHTML = `All cards`;
        return;
      }
      document.querySelector('.filtered-from-to').innerHTML = `Filtred ${
        filterState.from ? `from ${filterState.from}` : ``
      }${filterState.to ? ` to ${filterState.to}` : ``}`;
    };
    const updateSortedStateInfo = () => {
      document.querySelector('.sorted').innerHTML = `Filtred: ${sortState}`;
    };
    const fullUpdate = () => {
      updateSum();
      updateCards();
      updateFilterInfo();
      updateSortedStateInfo();
    };
    const createCard = (name, price, description, id) => {
      let card = document.createElement('li');
      card.className = 'card-list__card';
      card.id = id;
      card.innerHTML = `<p class="card-list__name">name: ${name}</p>
       <p class="card-list__price">price: ${price}</p>
       <p class="card-list__description">description: ${description}</p>`;
  
      let deleteButton = document.createElement('input');
      deleteButton.className = 'card-list__delete-button';
      deleteButton.type = 'button';
      deleteButton.value = 'delete';
  
      card.append(deleteButton);
  
      deleteButton.onclick = (e) => {
        let card = e.target.parentElement;
        setCards(cards.filter((item) => item.id != card.id));
      };
  
      return card;
    };
    inputForm.onsubmit = (e) => {
      e.preventDefault();
  
      const name = nameInput.value;
      const price = priceInput.value;
      const description = descriptionInput.value;
      const id = index++;
  
      setCards([
        ...cards,
        {
          name,
          price,
          description,
          id,
        },
      ]);
  
      nameInput.value = '';
      priceInput.value = '';
      descriptionInput.value = '';
    };
    filterForm.onsubmit = (e) => {
      e.preventDefault();
  
      const fromInput = document.querySelector('.filter-form__from-value');
      const toInput = document.querySelector('.filter-form__to-value');
  
      const from = fromInput.value === '' ? null : parseInt(fromInput.value);
      const to = toInput.value === '' ? null : parseInt(toInput.value);
  
      setFilterState({ from, to });
  
      fromInput.value = '';
      toInput.value = '';
    };
    sortForm.onsubmit = (e) => {
      e.preventDefault();
      let selectedIndex = document.querySelector('.sort-form__select')
        .selectedIndex;
      let options = document.querySelector('.sort-form__select').options;
      let newSortState = options[selectedIndex].text;
  
      setSortState(newSortState);
    };
    priceInput.onchange = (e) => {
      const price = priceInput.value.trim();
      if(!validatePrice(price) && price === ''){
        // show error
        // add error class 
        setErrorFor(priceInput, `Price must be not negative number`);
      }
      else{
        //add success class
        setSuccessFor(username);
      }
    }
  
    fullUpdate();
  };
  