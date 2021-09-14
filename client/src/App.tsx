import React, {useState} from 'react';
import SearchService from './libs'
import _ from 'lodash'
function App() {

  const [search, setSearch] = useState([])
  const handleChange = (event: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    event.preventDefault()
    const value = event.target.value
    setSearch([])
    if (value.length > 1) {
      const textSearch = _.debounce( async () => {
        let {data: body } = await SearchService.search(value)
        setSearch(body.body)
      },1100)
      textSearch()
    }
  }

  const renderSuggestions = () => {
    if (search?.length > 0)
    return search.map((sug: any, index: number) => {
      return (
        <li className="list-search" key={index}>
          <b><i className="bx bx-map-pin"> </i> {sug.name? sug.name : sug.clinicName}</b>
          <b><i className="bx bx-map-pin"> </i> {sug.stateName? sug.stateName : sug.stateCode}</b>
          <b><i className="bx bx-map-pin"> </i> {sug.availability? `${sug.availability.from} - ${sug.availability.to}` :
            `${sug.opening.from} - ${sug.opening.to}` }
          </b>
        </li>
      );
    });
  }


  return (
    <div className="container">
      <br/>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card card-sm">
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <i className="fas fa-search h4 text-body"></i>
              </div>
              <div className="col">
                <input className="form-control form-control-lg form-control-borderless" type="search"
                       placeholder="Search topics or keywords" onChange={handleChange} />
               { search.length ? <ul className="google_autocomplete">{renderSuggestions()} </ul>: "" }
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
