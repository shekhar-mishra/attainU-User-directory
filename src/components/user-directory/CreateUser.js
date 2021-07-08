import React from 'react'
class CreateUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
       email: '',
      countryData:[],
      seletedCountry:'',
      date:''
    };


  }
  componentDidMount(){
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then((result) => {
        this.setState({
          countryData:result
        })
        
    })
  }
  handleCountryChange(e){
    this.setState({
      seletedCountry:e.target.value
    })
    console.log("event==",e)
  }

  goBack () {
    this.props.history.push('/')
  }
  saveUser () {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="container">
        <div className="row d-flex flex-row py-5">
          <div className="col-md-6">
            <div className="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name" />
              </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
          </div>
          <div className="col-md-6">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Country</label>
            <select placeholder="select Country"  className="form-control" id="exampleFormControlSelect1" value={this.state.seletedCountry} onChange={this.handleCountryChange.bind(this)}>
            {this.state.countryData.map((e, key) => {
             return <option key={key} value={e.alpha2Code} name={e.name}>{e.name}</option>;
           })}
            
            </select>
            </div>
          </div>
          <div className="col-md-6">
          <div class="form-group">
          <label for="dob">DOB:</label>
            <input className="form-control" type="date" id="dob" name="dob"/>
            </div>
          </div>
          <div className="col-md-12 m-t-6">
          <button type="button" className="btn btn-primary m-b-6" onClick={this.saveUser.bind(this)} >Save</button>
          <button type="button" className="btn btn-primary m-b-6 secondaryBlack" onClick={this.goBack.bind(this)}>Back</button>
          </div>        
        </div>
      </div>

    )
  }
}
export default CreateUser