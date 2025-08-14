// Part 1 -------------------------------------|
// Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector(`main`);
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// // Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = `var(--main-bg)`;
// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;
// Add a class of flex-ctr to mainEl.
// // Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');

// Part 2: Creating a Menu Bar ---------------------------------------------|
// Next, create a blank menu bar that we can use to later add some interactivity to the page:
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.querySelector('#top-menu');
// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`; 
// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add(`flex-around`);

// Part 3: Adding Menu Buttons ---------------------------------------|
// To continue:
const menuLinks = [
{text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
// Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object.
// Append the new element to the topMenuEl element.

for (let link of menuLinks) {
  const a = document.createElement('a');
  a.setAttribute('href', link.href);
  a.textContent = link.text;
  topMenuEl.appendChild(a);
}

const topMenuLinks = document.querySelectorAll('#top-menu a');

// ✅ Add delegated event listener to topMenuEl
topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.tagName !== 'A') return;

  console.log('You clicked:', event.target.textContent);
});

// Part 4 ------------------------------------------------|
// All future steps should be completed within the index.js file.

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');
// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = '100%';
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// Part 5: Adding Menu Interaction
// In order to add interaction:
// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Attach a delegated 'click' event listener to topMenuEl.
// // The first line of code of the event listener function should call the event object's preventDefault() method.
// // The second line of code of the function should immediately return if the element clicked was not an <a> element.
// // Log the content of the <a> to verify the handler is working.

topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();

  // Only proceed if an <a> was clicked
  if (event.target.tagName !== 'A') return;

  const clickedLink = event.target;
  const isActive = clickedLink.classList.contains('active');

  // Remove 'active' from all links
  topMenuLinks.forEach(link => link.classList.remove('active'));

  // Hide submenu by default
  subMenuEl.style.top = '0';

  // If link was NOT active before
  if (!isActive) {
    clickedLink.classList.add('active');

    // Find matching object in menuLinks array
    const linkObject = menuLinks.find(link => link.text === clickedLink.textContent);

    // If subLinks exist, build submenu and show it
    if (linkObject && linkObject.subLinks) {
      buildSubMenu(linkObject.subLinks);
      subMenuEl.style.top = '100%';
    }
  }
});

function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = '';

  for (let link of subLinks) {
    const a = document.createElement('a');
    a.setAttribute('href', link.href);
    a.textContent = link.text;
    subMenuEl.appendChild(a);
  }
}

