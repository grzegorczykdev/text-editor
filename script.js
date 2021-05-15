; (function () {

    const editButtons = document.querySelectorAll('.editor__btn--edit')
    const editorContent = document.querySelector('.editor__content')
    const saveButton = document.querySelector('.editor__btn--save')
    const loadButton = document.querySelector('.editor__btn--load')
    const notes = document.querySelector('.notes__content')

    const addFunctionality = function () {
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                let command = button.dataset['element']
                document.execCommand(command, false, null)
            })
        });
    }

    const showInfo = function (text) {
        const info = document.querySelector('.info')
        info.style.display = 'block';
        info.innerText = text
    }

    const saveButtonHandler = function () {
        let textToSave = editorContent.innerHTML
        if (!textToSave) {
            showInfo('Nothing to save!')
        } else {
            let fileName = prompt('Save as:')
            if (!fileName) {
                showInfo('Try again. Type a valid name.')
            } else {
                const textJSON = JSON.stringify(textToSave)
                showInfo(`Successfully saved to Local Storage as: '${fileName}'.`)
                localStorage.setItem(fileName, textJSON)
                editorContent.innerHTML = ''
            }
        }
        showNotesFromLocalStorage()
    }

    const loadButtonHandler = function () {
        {
            let fileName = prompt('Choose note to load:')
            if (localStorage.getItem(fileName) === null) {
                showInfo('A note with that name does not exist.')
            } else {
                const text = JSON.parse(localStorage.getItem(fileName))
                editorContent.innerHTML = text
                showInfo(`Note '${fileName}' loaded.`)
            }
        }
    }

    const createNote = function (key) {
        const note = document.createElement('p')
        const deleteButton = document.createElement('button')

        note.className = 'notes__note'
        note.innerText = key

        deleteButton.className = 'notes__btn--delete'
        deleteButton.innerHTML = 'x'
        deleteButton.addEventListener('click', () => { deleteButtonHandler(key) })

        note.appendChild(deleteButton)
        notes.appendChild(note)
    }

    const showNotesFromLocalStorage = function () {
        notes.innerHTML = ''
        const storage = localStorage
        for (const key in storage) {
            if (key === 'length') return
            createNote(key)
        }
    }

    const deleteButtonHandler = function (key) {
        localStorage.removeItem(key)
        showNotesFromLocalStorage()
        showInfo(`Note '${key}' deleted.`)
    }

    const init = function () {
        addFunctionality()
        showNotesFromLocalStorage()
        saveButton.addEventListener('click', () => saveButtonHandler())
        loadButton.addEventListener('click', () => loadButtonHandler())
    }

    init()

})()