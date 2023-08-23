import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, Container, Spinner } from "react-bootstrap"

interface ICategories {
  id: number,
  description: string,
  name: string
}

export const App = () => {

  const [data, setData] = useState<Array<ICategories>>()
  const [tableClose, setTableClose] = useState<boolean>(false)

  const apiRequest = async () => {
    try {
      const apiUrl: string = "https://northwind.vercel.app/api/categories"
      const response = await axios.get(apiUrl)
      setData([...response.data])
    }
    catch (err) {
      console.log("err ==>", err)
    }
  }


  const columns = useMemo(() => {
    const col: (keyof ICategories)[] = ["id", "description", "name"]
    return col
  }, [])



  useEffect(() => {
    apiRequest()

  }, [])


  if (!data) {
    return (
      <div style={{ display: "flex", "justifyContent": "center", alignItems: "center" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

    )
  }

  return (
    <Container style={{ marginTop: "40px" }}      >
      <h2>Belsis Test</h2>

      <Table striped bordered hover size="sm" style={{ margin: "20px 0", display: tableClose ? "none" : "table" }}  >
        <thead>
          <tr>
            {
              columns.map((item, index) => {

                return (
                  <th key={index} >
                    {item}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {

              return (
                <tr>
                  <td>
                    {
                      item.id
                    }
                  </td>
                  <td>
                    {
                      item.description
                    }
                  </td>
                  <td>
                    {
                      item.name
                    }
                  </td>
                </tr>
              )

            })
          }


        </tbody>
      </Table>
      <Button variant={tableClose ? "primary" : "danger"} onClick={() => {

        setTableClose(!tableClose)

      }}  >
        {
          tableClose ? "Open" : "Close"
        }
      </Button>
    </Container>
  );
};
export default App;
