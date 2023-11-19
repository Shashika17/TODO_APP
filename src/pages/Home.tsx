import React, { useState, useEffect } from 'react';
import { readnotes,addnote,updatenote,mydelete } from '../APIS/notesapi';
import "../styles/homedis.css";


export default function Home() {

  const [data, setData] = useState<any[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [content1, setcontent1]=useState("");
  const [ide, setide]=useState("");
  const [idfordelete, setidfordelete]=useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);


 
  const fetchData = async () => {
    try {
      const result = await readnotes();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once after the initial render


   useEffect(()=>{
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
   }, [fetchData()])

  const deleteNote = async () =>
  {
    try{
      const ideee=
      {
        id:idfordelete,
      }
      await mydelete(ideee);
    //  await fetchData();
    }
    catch(error)
    {
       console.log(error);
    }
      
  }
  //to trigger deleteNote
  useEffect(()=>{

    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const ddelte = async () =>{
     if(idfordelete !== null)
     {
       await deleteNote();
     }
     else
        {
          console.log("LOL");
        }
    }
     ddelte();
   },[idfordelete]);
  //useEffect for trigger fupdateNote funtion when get any difference in ide constructor
  useEffect(() =>{

    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    const uupdate = async () =>{
      if(ide !== null && ide !== "")
      {
         await fupdateNote();
      }
     
    }
   uupdate();
   setide("");
  },[ide]);

 //useEffect for trigger fupdateNote funtion when get any difference in idfordelete constructor

  const addNote = async () => {
    try {
      const updatedPostData = {
        content: newNoteContent,
        createdDate: new Date(),
      };
      await addnote(updatedPostData);
      setNewNoteContent("");
    //  fetchData();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }
  const fupdateNote = async () =>
  {
   
    if(content1 !== "")
    {
      try{
        const editted1=
        {
          id:ide,
          content:content1,
        };
        await updatenote(editted1);
      //  await fetchData();
        setcontent1("");
    }
    catch(error)
    {
      console.log(error);
    }
  }
  else
  {
    console.log("To update Note,Note can't be blank or same original note");
  }
  }
  

  return (
    <div>
      <div className='centeredContainer'>
        <div className='background'> 
          <h1 className='topic'>TODO LIST</h1>
          </div>
      </div>
          <div className='centeredContainer'>
            <input  className='input-note'type="text" id="content" name="content" value={newNoteContent} onChange={(e)=>{setNewNoteContent(e.target.value)}}/>
            <button onClick={addNote} className='btn btn-add'>ADD NOTES</button>
          </div>
          <div>
            {data && (
              <ul>
                {data.map(item => ( 
                  <li key={item.id}>
                    <div className='tex'>
                  <textarea onChange={(e)=>{setcontent1(e.target.value)}}>{item.content}</textarea>
                  <p>{item.createdDate}</p>
                  </div>
                  <div className='btnset'>
                  <div className='centeredContainer'>
                   <button className="btn btn-delete"onClick={()=>{setidfordelete(item.id)}} > 
                   <span className="mdi mdi-delete mdi-24px"></span>
                   <span className="mdi mdi-delete-empty mdi-24px"></span>
                   <span>DELETE</span>
                   </button>
                  <button className='btn btn-update'onClick={()=>{setide(item.id)}}>UPDATE</button>
                  </div>
                  </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
    </div>
  );
}
