
import './App.css'
import { Button, Card, CardContent, IconButton, Rating, Tooltip } from '@mui/material'
import SpaIcon from '@mui/icons-material/Spa';
import EditIcon from '@mui/icons-material/Edit';

import { Spa } from '@mui/icons-material';

function App() {

  return (
    <>
    <Card>
      <CardContent>
        
        <Button variant="contained" startIcon={<SpaIcon />}>Vegan</Button>
        <Rating
          name="simple-uncontrolled"
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          defaultValue={0}
          precision={1}
          max={15}
        />
      </CardContent>
    </Card>
    
    <Tooltip title="Edit">
      <IconButton onClick={() => alert("Edit")}>
        <EditIcon></EditIcon>
      </IconButton>
    </Tooltip>

    </>
  )
}

export default App
