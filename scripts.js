

function handleFormSubmit(event) {
    event.preventDefault();
    alert('Your message has been sent!');
    event.target.reset(); }
function displayItems(items, containerId) {
    const container = document.getElementById(containerId);
    Array.from(items).forEach(item => {
        const name = item.getElementsByTagName('name')[0].textContent;
        const price = item.getElementsByTagName('price')[0].textContent;
        const description = item.getElementsByTagName('description')[0]?.textContent || 'No description available';
        const image = item.getElementsByTagName('image')[0]?.textContent || 'default-image.jpg';

        const itemElement = document.createElement('article');
        itemElement.classList.add('menu-item');
        itemElement.innerHTML = `
            <h3>${name}</h3>
            <img src="${image}" alt="${name}" style="width: 100%; height: auto;">
            <p>Description: ${description}</p>
            <p>Price: $${price}</p>
        `;

        container.appendChild(itemElement);
    });
}
if (document.getElementById('meals-slider') || document.getElementById('beverages-slider') || document.getElementById('other-beverages-slider')) {
    fetch('menu.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

            const meals = xmlDoc.getElementsByTagName('meal');
            const beverages = xmlDoc.getElementsByTagName('beverage');
            const otherBeverages = xmlDoc.getElementsByTagName('otherBeverage');

            console.log('Meals:', meals.length);
            console.log('Beverages:', beverages.length);
            console.log('Other Beverages:', otherBeverages.length);

                        if (document.getElementById('meals-slider')) displayItems(meals, 'meals-slider');
            if (document.getElementById('beverages-slider')) displayItems(beverages, 'beverages-slider');
            if (document.getElementById('other-beverages-slider')) displayItems(otherBeverages, 'other-beverages-slider');
        })
        .catch(error => console.error('Error loading menu XML:', error));
}

if (document.getElementById('branches-section')) {
    fetch('branches.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
            const branches = xmlDoc.getElementsByTagName('branch');
            const branchesSection = document.getElementById('branches-section');

            Array.from(branches).forEach(branch => {
                const address = branch.getElementsByTagName('address')[0].textContent;
                const contact = branch.getElementsByTagName('contact')[0].textContent;
                const hours = branch.getElementsByTagName('hours')[0].textContent;
                const mapLink = branch.getElementsByTagName('mapLink')[0].textContent;

                const branchItem = document.createElement('div');
                branchItem.classList.add('branch-item');
                branchItem.innerHTML = `
                    <h3>Branch</h3>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Contact:</strong> ${contact}</p>
                    <p><strong>Opening Hours:</strong> ${hours}</p>
                    <p><a href="${mapLink}" target="_blank">View on Google Maps</a></p>
                `;

                branchesSection.appendChild(branchItem);
            });
        })
        .catch(error => console.error('Error loading branches XML:', error));
}
document.getElementById('year').textContent = new Date().getFullYear();