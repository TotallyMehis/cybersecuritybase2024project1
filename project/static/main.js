function newMessage() {
    const msgElement = document.getElementById('message')
    const nameElement = document.getElementById('name')

    if (!(msgElement instanceof HTMLTextAreaElement) || !(nameElement instanceof HTMLInputElement)) {
        return
    }

    const message = msgElement.value
    const name = nameElement.value

    // A04:2021 – Insecure Design
    // CWE-602: Client-Side Enforcement of Server-Side Security
    // Back-end should also have this feature.
    const failReason = checkMessageContents(message)
    if (failReason) {
        alert(failReason)
        return
    }

    createMessageElement(name, message)


    const url = '/api/message?' + new URLSearchParams({ message })

    // A01:2021 – Broken Access Control
    // CWE-352 Cross-Site Request Forgery (CSRF)
    // Send a POST request instead and remember to use CSRF token.
    // fetch(url, { method: 'POST', headers: { 'X-CSRFToken': getCSRFToken() }})
    fetch(url, { method: 'GET' })
}

/**
 * @param {string} message 
 */
function checkMessageContents(message) {
    if (!message) {
        return 'You must have a message!'
    }

    if (message.match(/(<|>)/)) {
        return 'You cannot use characters < and >.'
    }

    return ''
}

function getCSRFToken() {
    // The documented way of using CSRF token:
    // https://docs.djangoproject.com/en/5.0/howto/csrf/
    const inputElement = document.querySelector('[name=csrfmiddlewaretoken]')
    if (inputElement instanceof HTMLInputElement) {
        return inputElement.value
    } else {
        return ''
    }
}

function createMessageElement(name, message) {
    const noMsgElement = document.getElementById('nomessages')
    if (noMsgElement) noMsgElement.remove()

    const messagesElement = document.getElementById('messages')

    const msgElement = document.createElement('div')
    const contentElement = document.createElement('div')
    const nameElement = document.createElement('div')
    msgElement.classList.add('msg')
    nameElement.classList.add('name')
    contentElement.classList.add('content')

    msgElement.appendChild(nameElement)
    msgElement.appendChild(contentElement)
    messagesElement.appendChild(msgElement)

    msgElement.scrollIntoView()

    /**
     * A03:2021 – Injection
     * CWE-80: Improper Neutralization of Script-Related HTML Tags in a Web Page (Basic XSS)
     * Can be fixed using textContent instead of innerHTML.
     */
    nameElement.innerHTML = name
    contentElement.innerHTML = message
}
