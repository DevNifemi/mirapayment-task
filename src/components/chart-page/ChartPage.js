import axios from 'axios';
import React, { useMemo, useEffect, useState } from 'react'
import { VictoryChart, VictoryHistogram } from 'victory';


const ChartPage = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
            params: {nconst: 'nm0001667'},
            headers: {
              'x-rapidapi-host': 'imdb8.p.rapidapi.com',
              'x-rapidapi-key': 'c4f2e6ec36msh5417b276cd7a297p13c387jsn033e6bfd64d4'
            }
        };
        const getAwards = async () => {
            const {data: response} = await axios.request(options)
            const datas = await response.resource.awards
            setData(datas)
          }

        getAwards()
    }, [])
    
    //Get data values from state and 
    //convert to readable data by bar chart
    const barData = useMemo(() => {
        return data.map(d => {
           return {x: d.year}
        })
    },[data])
    

    // JSX elements 
  return (
	<div className='d-center' style={{ maxWidth: "700px", marginTop: 100 }}>
        <VictoryChart domainPadding={10}>

            <VictoryHistogram 
                labels={({ datum }) => `Count:\n ${datum.y}`}  
                binSpacing={10} style={{ data: { fill: '#0ea035' }}} 
                cornerRadius={1}
                data={barData}
            />

        </VictoryChart>

        <div className='d-center'>
          X-Axis:  Years Values <br/>
          Y-Axis:  Count Values / Award Amounts
        </div>
	</div>

  )
}

export default ChartPage