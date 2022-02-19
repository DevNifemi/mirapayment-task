import React, { useEffect, useState } from 'react';
import { truncateString } from '../../assets/util';
import './post-cards.styles.css'


const UpdateForm = ({unDisplayModal, onUpdate}) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setID] = useState(null);
    // Get all values from localStorage 
    useEffect(() => {
        // Set localStorage value to state 
        setID(localStorage.getItem('ID'))
        setBody(localStorage.getItem('Body'));
        setTitle(localStorage.getItem('Title'));
    }, []);



    return (
        <div onClick={() => unDisplayModal(false)} className='modal'>

            <div onClick={(e) => e.stopPropagation()} className="create-form">

                <button className='close-popup' onClick={() => unDisplayModal(false)}>Close PopUp</button>

                <div className='form-lists'>
                    <label>Title</label>
                    <input 
                        className='update-input'
                        placeholder='Title' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Body</label>
                    <textarea 
                        className='update-textarea'
                        value={body} 
                        placeholder='Body' 
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                <button 
                className='update'
                onClick={() => onUpdate({id, body, title}, unDisplayModal)} 
                type='submit'>
                Update</button>

            </div>

        </div>
        )

}



const PostCards = ({ data, onDelete, onUpdate }) => {
    const [showModal, setShowModal] = useState(false);

    // ====> UPDATE
    const triggerUpdate = (newData) => {
        let { body, title, id} = newData
        localStorage.setItem('ID', id);
        localStorage.setItem('Body', body);
        localStorage.setItem('Title', title);
        setShowModal(true)
    }

  return (
        <div className='template-grid d-center'>
            {
                data.map((d) => (
                    <div key={d.id} className='template-card'>

                        <div className='template-card-desc'>
                           <div className='template-card-title'>
                                <h3> {truncateString(d.title, 10)}</h3>
                                <i onClick={() => onDelete(d.id)} className='bx bx-x'/>
                            </div>

                            <p>{truncateString(d.body)}</p>
                        </div>

                        <div className='template-link'>
                            <span onClick={() => triggerUpdate(d)}> Update Post <i className='bx bxs-edit-alt'></i></span>
                        </div>
                    </div>
                    
                ))
                
            }

           {showModal && 
           <UpdateForm 
            onUpdate={onUpdate} 
            unDisplayModal={setShowModal}/>
            }
        </div>
      
    
  )
};

export default PostCards;
