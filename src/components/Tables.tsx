import axios from "axios"
import { FunctionComponent, useEffect,useState } from "react"
import { Table } from "react-bootstrap"
import { FileProp, SERVER_URL } from "../constants/config"
import Forms from "./Forms"

const Tables: FunctionComponent = () => {
   const [files, setFiles] = useState<FileProp[]>([])
  useEffect( () => {
   const data = async () => {
     await axios.get(SERVER_URL).then(res => {setFiles(res.data)}).catch(err => {return err})
    }
    data()
  },[files.length])

  const handleDelete = async (id:any) => {
    const response = await axios.delete(SERVER_URL + `/${id}`).then(res => {
        return res
    }).catch(err => {
        return err
    })

   if(response.status === 204){
    setFiles(() => {
        const update =  files.filter( file => file.id !== id)
        return update;
    })
   }
  }
  return (
    <>
    <Forms files={files} setFiles={setFiles} />
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>NAME</th>
          <th>URL</th>
          <th>SIZE</th>
          <th>CREATED AT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {files.length > 0 && files.map((file:FileProp) => (
            <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.name}</td>
                <td>{file.url}</td>
                <td>{file.size}</td>
                <td>{file.createdAt}</td>
                <td><button className="btn btn-danger" onClick={() => handleDelete(file.id)}>DELETE</button></td>
            </tr>
        ))}

      </tbody>
    </Table>

    </>
  )
}

export default Tables
