import axios from 'axios';

//getdata from endpoint
const readnotes=async()=>
{
try{
    //fetching data and store fetched data on response constructor
    const response = await axios.get('http://localhost:5098/Notes');
    //return responsed data
    return response.data;
}
//if fetching data get failed view reason(error) on console
catch(error)
{
    console.log(error);
    throw error;
}
}
//define postdata structure
interface PostData{

    content:string;
    createdDate:Date;
}
//post info to endpoint
const addnote = async (postData:PostData) =>
{
    try
    {
       const response =await axios.post('http://localhost:5098/Notes',postData);
       console.log('note created successfully : ', response.data);
    }
    catch(error)
    {
       console.log('Error creating post : ',error);
    }
}
//Update info using put endpoint

interface UpdatedNote
{
   id:string;
   content:string;
}


const updatenote = async (updateNote:UpdatedNote)=>
{
    try
    {
       const response =await axios.put('http://localhost:5098/Notes',updateNote);
       console.log('note updated successfully : ', response.data);
       return response.data;
    }
    catch(error)
    {
       console.log('Error creating post : ',error);
    }

}

//delete note
interface DeleteId
{
    id:string;
}

const mydelete = (deletid:DeleteId) =>{
const deleteNote = async () =>
{
    try{
   const response = await axios.delete(`http://localhost:5098/Notes?id=${deletid.id}`);
   console.log('note deleted sucessfully : ',response.data);
   return response.data;
    }
    catch(error)
    {
    console.log(error);
    }

}
deleteNote();
}


export{readnotes,addnote,updatenote,mydelete};




