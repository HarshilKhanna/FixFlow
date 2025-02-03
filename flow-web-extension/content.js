document.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    let selector = getUniqueSelector(event.target);
    console.log("Selected element:", selector);

    chrome.runtime.sendMessage({ action: "elementSelected", selector: selector });
}, true);

// Function to generate a CSS selector
function getUniqueSelector(element) {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${(element.className || '').split(" ").join(".")}`;
    return element.tagName.toLowerCase();
}
