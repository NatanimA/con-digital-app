import { FunctionComponent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { IProp, SERVER_URL,FileProp } from '../constants/config';

const Forms: FunctionComponent<IProp> = (prop: IProp) => {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setFiles,files } = prop

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile as File);

      const response = await axios.post(SERVER_URL, formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        }
      }).then(result => {
        return result
      }).catch(err => {
        return err
      });

      if(response?.status === 201){
        const newData: FileProp = response.data
        setFiles(pv => {
          return [...pv,newData]
        })
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setFileInputState(event.target.value);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} style={{display:'flex',width:'100%',padding:'1rem',gap:'1rem'}}>
          <Form.Group controlId="formFileLg" className="mb-3" style={{width:'90%'}}>
            <Form.Control type="file" size="lg" onChange={handleChange} required/>
          </Form.Group>
          <Button type='submit' variant='primary' style={{width:'10%',height:'fit-content'}}>
              Add File
          </Button>
      </Form>

    </>
  )
}

export default Forms
