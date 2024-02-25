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

    if (!name) {
        alert('You must have a name!')
        return
    }

    createMessageElement(name, message)
    // fetch('/api/message', { method: 'GET', body: JSON.stringify({ message, nickname }) }).then(response => {
        
    // })
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
