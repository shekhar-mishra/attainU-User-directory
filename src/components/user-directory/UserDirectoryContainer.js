import React from 'react'
import _, {debounce} from 'lodash';
import UserDirectoryList from './UserDirectoryList'
import Pagination from '../Pagination'

export default class UserDirectoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allCountries: [],
            currentCountries: [],
            currentPage: null,
            totalPages: null,
            searchString:''
        }
    }
    searchWithDebounce= debounce(function (string){
       console.log("texttt===",string)
       let tempUserData=JSON.parse(JSON.stringify(this.state.allCountries))
       if(string!=="") {
        const lowercasedValue = string.toLowerCase();      
        const filteredData = _.filter(tempUserData,el =>
             el['Full Name'].toLowerCase().includes(lowercasedValue)
         
        );  
       this.setState({
           currentCountries:filteredData
       })
       }else{
        this.setState({
            currentCountries:tempUserData
        }) 
       }
      
     
       
    },3000)

    handleChange =(event) =>{
        console.log("eeeee",event.target.value)
        this.setState({
            searchString:event.target.value
        })
        this.searchWithDebounce(event.target.value)

    }

    onPageChanged = (data) => {
        const { allCountries } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = allCountries.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentCountries, totalPages });
    };
    componentDidMount() {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    user: result,
                    allCountries:result
                })
                console.log("dadadada", result)
            })

            const data =  {
                "Full Name": "Shekhar Mishra",
                "Country": "India1",
                "Id": 80000,
                "Date of birth": "2005-10-13T08:15:58.878Z",
                "Email": "Austyn.Mueller@bryana.biz",
                "Created at": "1992-11-29T05:19:06.775Z"
              }

fetch('http://localhost:3001/users', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    }
    render() {
        const {
            allCountries,
            currentCountries,
            currentPage,
            totalPages
          } = this.state;
          const totalCountries = allCountries.length;
      
          if (totalCountries === 0) return null;
      
        return (
            <div className="container mb-5">
                <div className="row d-flex flex-row py-5">
               
                    <div className="col-md-6">
                        <div>
                            <input
                                className="w-100"
                                type="text"
                                value={""}
                                ref="search"
                                placeholder="Filter..."
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <input
                                className="w-100"
                                type="text"
                                value={this.state.searchString}
                                ref="search"
                                onChange={this.handleChange}
                                placeholder="Search ..."
                            />
                        </div>
                    </div>
                
                
                {currentCountries.map(user => (    
                    
                          <UserDirectoryList user={user} />
                               
                
                 
          ))}
                </div>

             
           
                <div className="row">
                   <div>
                   <Pagination
                        totalRecords={totalCountries}
                        pageLimit={10}
                        pageNeighbours={1}
                        onPageChanged={this.onPageChanged}
                    />
                   </div>
                </div>
            </div>
        );
    }

}


