import './EditorButton.css'

export const EditorButton=({isActive})=>{

    function handleclick(){
        // to be done
    }

    return (
        <button className='editor-button'
            style={{
                color:isActive?'white':"#959eba",
                backgroundColor:isActive?"#303242":"#4a4859",
                borderTop:isActive?"1px solid pink ":"none",

            }}

            onClick={handleclick}
            >
            file.js
        </button>
    )
}