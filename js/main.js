"use strict";

window.addEventListener('DOMContentLoaded', function () {
  // Menu hidden / show
  var burger = document.querySelector('.js-burger'),
      nav = document.querySelector('.js-nav');
  burger.addEventListener('click', function (e) {
    burger.classList.toggle('_active');
    nav.classList.toggle('_active');
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 769) {
      burger.classList.remove('_active');
      nav.classList.remove('_active');
    }
  }); // Scroll Event Listener 

  var scrollTopArrow = document.querySelector('.js-scroll-top');
  window.addEventListener('scroll', scrollListen);
  var endZone = document.querySelector('.js-footer').offsetTop - window.innerHeight + 100;

  function scrollListen() {
    if (window.pageYOffset > endZone) {
      scrollTopArrow.parentElement.style.opacity = 1;
    } else {
      scrollTopArrow.parentElement.style.opacity = 0;
    }
  } // Scroll Top Position


  scrollTopArrow.addEventListener('click', scrollToTop);

  function scrollToTop(e) {
    e.preventDefault();
    var href = this.getAttribute('href');
    var offsetTop = document.querySelector(href).offsetTop;
    scroll({
      top: offsetTop,
      behavior: 'smooth'
    });
  } // From Validation Submit


  var form = document.querySelector('.js-form'),
      email = document.querySelector('.js-form-email'),
      regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (email.value === '' || !regExp.test(email.value)) {
      email.focus();
      email.style.border = '1px solid red';
      email.style.color = 'red';
    } else {
      email.style.border = 'none';
      email.style.color = '#000';
      email.value = ''; // Fetch Getting
    }
  }); // Sort Elements

  var sortBtn = document.querySelectorAll('.js-sort-btn'),
      sortList = document.querySelectorAll('.js-sort-list'),
      priceItems = document.querySelectorAll('.js-price'),
      ageItems = document.querySelectorAll('.js-age');
  sortBtn.forEach(function (item, i) {
    item.addEventListener('click', function () {
      sortList[i].classList.toggle('_active');
    });
  });
  priceItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      priceItems.forEach(function (item) {
        item.classList.remove('_active');
      });
      priceItems[i].classList.add('_active');
    });
  });
  ageItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      ageItems.forEach(function (item) {
        item.classList.remove('_active');
      });
      ageItems[i].classList.add('_active');
    });
  });
  closeSortList(sortBtn[0], sortList[0]);
  closeSortList(sortBtn[1], sortList[1]);

  function closeSortList(param1, param2) {
    document.addEventListener('click', function (e) {
      if (!param1.contains(e.target) && !param2.contains(e.target)) {
        param2.classList.remove('_active');
      }
    });
  } // Sorting Method


  var cardsContainer = document.querySelector('.js-cards__inner'),
      sortprice = document.querySelectorAll('.js-price'),
      sortage = document.querySelectorAll('.js-age');
  sortprice.forEach(function (item, i) {
    item.addEventListener('click', function () {
      switch (i) {
        case 0:
          ascSort('data-price');
          break;

        case 1:
          descSort('data-price');
          break;

        case 2:
          descSort('data-rating');
          break;

        default:
          break;
      }
    });
  });
  sortage.forEach(function (item, i) {
    item.addEventListener('click', function () {
      switch (i) {
        case 0:
          ascSort('data-age');
          break;

        case 1:
          descSort('data-age');
          break;

        case 2:
          descSort('data-rating');
          break;

        default:
          break;
      }
    });
  });

  function ascSort(dataSort) {
    for (var i = 0; i < cardsContainer.children.length; i++) {
      for (var j = i; j < cardsContainer.children.length; j++) {
        if (+cardsContainer.children[i].getAttribute(dataSort) > +cardsContainer.children[j].getAttribute(dataSort)) {
          var replacedNode = cardsContainer.replaceChild(cardsContainer.children[j], cardsContainer.children[i]);
          insertAfter(replacedNode, cardsContainer.children[i]);
        }
      }
    }
  }

  function descSort(dataSort) {
    for (var i = 0; i < cardsContainer.children.length; i++) {
      for (var j = i; j < cardsContainer.children.length; j++) {
        if (+cardsContainer.children[i].getAttribute(dataSort) < +cardsContainer.children[j].getAttribute(dataSort)) {
          var replacedNode = cardsContainer.replaceChild(cardsContainer.children[j], cardsContainer.children[i]);
          insertAfter(replacedNode, cardsContainer.children[i]);
        }
      }
    }
  }

  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibiling);
  } // Like Method


  var likeBtn = document.querySelectorAll('.js-card__like'),
      heart = document.querySelectorAll('.js-like'),
      favorites = document.querySelector('.js-favorites'),
      count = 0;
  likeBtn.forEach(function (item, i) {
    item.addEventListener('click', function () {
      if (heart[i].classList.contains('_active')) {
        heart[i].classList.remove('_active');
        count -= 1;
        favorites.innerHTML = "\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 : ".concat(count);
      } else {
        count += 1;
        heart[i].classList.add('_active');
        favorites.innerHTML = "\u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 : ".concat(count);
      }

      favorites.style.display = "block";
      setTimeout(function () {
        favorites.style.display = "none";
      }, 5000);
    });
  });
});