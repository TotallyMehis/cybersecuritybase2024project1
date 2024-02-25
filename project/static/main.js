function newMessage() {
    const msgElement = document.getElementById('message')
    const nameElement = document.getElementById('name')

    if (!(msgElement instanceof HTMLTextAreaElement) || !(nameElement instanceof HTMLInputElement)) {
        return
    }

    const message = msgElement.value
    const name = nameElement.value
    if (!message) {
        alert('You must have a message!')
        return
    }

    createMessageElement(name, message)


    const url = '/api/message?' + new URLSearchParams({ message })

    // A01:2021 – Broken Access Control
    // CSRF vulnerability
    // Send a POST request instead and remember to use CSRF token.
    // fetch(url, { method: 'POST', headers: { 'X-CSRFToken': getCSRFToken() }})
    fetch(url, { method: 'GET' })
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

async function getMessages() {
    const response = await fetch('/api/messages', { method: 'GET' })
    const content = await response.json()

    for (const msg of content.messages) {
        createMessageElement(msg.name, msg.message)
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
     * Can be fixed using textContent instead of innerHTML.
     */
    nameElement.innerHTML = name
    contentElement.innerHTML = message
}
