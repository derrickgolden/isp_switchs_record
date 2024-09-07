import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { DataTableComponentProps } from './types'
import { ExtractedPortDetailsProps } from '../../pages/types'

const DataTableComponent: React.FC<DataTableComponentProps> = ({ apidata, columns, search }) =>{
  const [data, setData] = useState(apidata as ExtractedPortDetailsProps[])
  const [datafilter, setFilter] = useState('')
  const [datafinals, setFinals] = useState(apidata as ExtractedPortDetailsProps[])

  useEffect(() => {
    let result: ExtractedPortDetailsProps[] = data?.filter((val ) => {      
      if (search == 'building') {
        return val.building_name?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'house_no') {
        return val.client_details?.house_no?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'client_name') {
        return val.client_details?.username?.toLowerCase().match(datafilter?.toLowerCase())
      }
      else if (search == 'phone') {
        return val.client_details?.phone?.toLowerCase().match(datafilter?.toLowerCase())
      }
    }) as ExtractedPortDetailsProps[]

    setFinals(result)

  }, [datafilter])

  useEffect(() => {
    setFinals(apidata as ExtractedPortDetailsProps[])
    setData(apidata as ExtractedPortDetailsProps[])
  }, [apidata])

  return (
    <>

      <div className="table-responsive ">
        <DataTable
          columns={columns}
          data={datafinals}
          pagination
          fixedHeader
          highlightOnHover
          striped
          responsive
          subHeader
          noHeader
          subHeaderComponent={
            <div className="row justify-content-start">
              <div className="col-12">
                <input type="text" placeholder={`search with ${search}`} className="form-control " 
                  value={datafilter} onChange={(e) => setFilter(e.target.value)} 
                />
              </div>
            </div>
           }
        />
      </div>
    </>
  )
}

export default DataTableComponent;
