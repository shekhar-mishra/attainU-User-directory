import React from 'react'
import _, { debounce } from 'lodash';
import UserDirectoryList from './UserDirectoryList'
import Pagination from '../Pagination'

export default class UserDirectoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allUsers: [],
            currentUsers: [],
            currentPage: null,
            totalPages: null,
            searchString: '',
            searchUsers: []
        }
    }
    //====================  Efficient search Functionality with Debounce===========================
    searchWithDebounce = debounce(function (string) {
       let tempUserData = JSON.parse(JSON.stringify(this.state.searchUsers))
        if (string !== "") {
            const lowercasedValue = string.toLowerCase();
            const filteredData = _.filter(tempUserData, el =>
                el['Full Name'].toLowerCase().includes(lowercasedValue)

            );
            this.setState({
                currentUsers: filteredData
            })
        } else {
            this.setState({
                currentUsers: this.state.searchUsers
            })
        }
    }, 1000)

    //  Onchange event for search
    handleChange = (event) => {
        this.setState({
            searchString: event.target.value
        })
        this.searchWithDebounce(event.target.value)

    }
    onPageChanged = (data) => {
        console.log("onpagedchanged===",data)
        const { allUsers } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentUsers = allUsers.slice(offset, offset + pageLimit);
        const searchUsers = allUsers.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentUsers, totalPages, searchUsers });
    };
    componentDidMount() {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    allUsers: result,
                    allUsers: result,
                })
                
            })

        const data = {
            "Full Name": "Shekhar Mishra",
            "Country": "India1",
            "Id": 80000,
            "Date of birth": "2005-10-13T08:15:58.878Z",
            "Email": "Austyn.Mueller@bryana.biz",
            "Created at": "1992-11-29T05:19:06.775Z"
        }

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
             })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    goToCreateUser () {
        this.props.history.push('/createUser')
    }
    deleteUser (user) {
        console.log("parenttt==",user)
        let tempArr=this.state.allUsers
        console.log(tempArr)
       console.log( tempArr.splice(user.Id, 1));
       console.log(tempArr)
    
        this.setState({
            allUsers:tempArr,
            //  currentUsers : tempArr.slice(offset, offset + paginationData.pageLimit),
            //  searchUsers :tempArr.slice(offset, offset + paginationData.pageLimit),
        },()=>{
            //this.onPageChanged(paginationData)
        })

    }
    render() {
        const {
            allUsers,
            currentUsers,
            currentPage,
            totalPages
        } = this.state;
        const totalUsers = allUsers.length;

        if (totalUsers === 0) return null;

        return (
            <div className="container mb-5">
                <div className="right">
                <button type="button" className="btn btn-primary" onClick={this.goToCreateUser.bind(this)}>Add User</button>
                </div>
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
                    {currentUsers.map(user => (
                        <UserDirectoryList user={user} deleteUser={this.deleteUser.bind(this)}/>
                    ))}
                </div>



                <div className="row">
                    <div>
                        <Pagination
                            totalRecords={totalUsers}
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


