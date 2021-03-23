const CreateMessage = () => {

    return(
        <div>
            <input type='text' name='toPerson' placeholder='To:' />
            <input type='text' name='title' placeholder='Title:' />
            <textarea name='content'/>
            <input type='submit' value='Send' />
            <button>Clear</button>
        </div>
    )
}

export default CreateMessage;